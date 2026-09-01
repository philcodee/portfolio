/* Fullscreen viewer for images, card stacks, slideshows and live mocks.
 *
 * Sibling of frame-modal.js (which owns iframes) and shares its visual
 * language: white ground, CLOSE bar, Esc to dismiss, body.nav-open to lock
 * the scroll-snap panels underneath.
 *
 * What opens, by rule: things that reward inspection. Decorative or
 * compositional art opts out with data-no-lightbox.
 *
 *   .img-frame img / .ref-img img   single image
 *   .card-stack                     grouped, MOBILE ONLY -- on desktop the
 *                                   click belongs to the hypercard shuffle
 *   [data-lightbox-slides]          slideshow, pages through its whole array
 *   .cg-mock-frame                  live DOM: moved in, moved back on close
 */
(function () {
  const MOBILE = '(max-width: 640px)';
  const isMobile = () => window.matchMedia(MOBILE).matches;

  let overlay, stage, bar, counter, caption, note, footer, closeBtn, prevBtn, nextBtn;

  // The caption is the copy already written beside the image on the page --
  // a .caption element, or a slide's own title. Never the alt attribute:
  // that is written for screen readers, and showing it here would compete
  // with the real copy. An image with no page copy simply gets no caption.
  const captionFor = el => {
    const wrap = el.closest('.img-frame, .ref-img');
    if (!wrap) return '';
    const sib = wrap.nextElementSibling;
    if (sib && sib.classList.contains('caption')) return sib.textContent.trim();
    const own = wrap.parentElement && wrap.parentElement.querySelector(':scope > .caption');
    return own ? own.textContent.trim() : '';
  };

  // Provenance note, shown under the caption at full size — where someone
  // pinching in is most likely to notice retouching and wonder about it.
  // Opt in per image with data-ai-note; the attribute's own text wins, or
  // leave it empty for this default.
  const DEFAULT_NOTE = 'Image edited with AI to remove the background and improve lighting.';
  const noteFor = el => {
    const holder = el.closest('[data-ai-note]');
    if (!holder) return '';
    return holder.getAttribute('data-ai-note').trim() || DEFAULT_NOTE;
  };
  let items = [];        // [{ kind:'image', src, alt } | { kind:'node', el }]
  let index = 0;
  let lastFocus = null;  // element to hand focus back to
  let placeholder = null;
  let borrowed = null;   // live node currently on loan to the overlay
  let swallowClick = false; // drop the click a touch gesture synthesises

  /* ── overlay ─────────────────────────────────────────────── */

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Expanded view');
    overlay.innerHTML = `
      <div class="lightbox-bar">
        <span class="lightbox-counter" aria-live="polite"></span>
        <button class="lightbox-close" aria-label="Close">CLOSE</button>
      </div>
      <div class="lightbox-body">
        <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8592;</button>
        <div class="lightbox-stage"></div>
        <button class="lightbox-nav lightbox-next" aria-label="Next">&#8594;</button>
      </div>
      <div class="lightbox-footer">
        <p class="lightbox-caption"></p>
        <p class="lightbox-note"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    stage    = overlay.querySelector('.lightbox-stage');
    bar      = overlay.querySelector('.lightbox-bar');
    counter  = overlay.querySelector('.lightbox-counter');
    caption  = overlay.querySelector('.lightbox-caption');
    note     = overlay.querySelector('.lightbox-note');
    footer   = overlay.querySelector('.lightbox-footer');
    closeBtn = overlay.querySelector('.lightbox-close');
    prevBtn  = overlay.querySelector('.lightbox-prev');
    nextBtn  = overlay.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));

    // Click anywhere to dismiss, the way a fullscreen viewer is expected to
    // behave. The bar and the paging arrows are the only exceptions.
    overlay.addEventListener('click', e => {
      if (swallowClick) { swallowClick = false; return; }
      if (e.target.closest('.lightbox-bar, .lightbox-nav')) return;
      close();
    });

    document.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', refit);
    window.addEventListener('orientationchange', refit);
    bindSwipe();
  }

  function render() {
    // Any live node from the previous frame goes home before we reuse the stage.
    restoreBorrowed();
    stage.innerHTML = '';

    const item = items[index];

    if (item.kind === 'node') {
      placeholder = document.createComment('lightbox-placeholder');
      item.el.parentNode.insertBefore(placeholder, item.el);
      borrowed = item.el;
      borrowed.classList.add('is-lightboxed');
      stage.appendChild(borrowed);
      caption.textContent = '';
      note.textContent = '';
    } else {
      const img = document.createElement('img');
      img.addEventListener('load', () => fitImage(img));
      img.src = item.src;
      img.alt = item.alt || '';
      stage.appendChild(img);
      if (img.complete) fitImage(img);   // already cached
      caption.textContent = item.caption || '';
      note.textContent = item.note || '';
    }
    // No page copy and no note means no footer at all, rather than an empty bar.
    footer.hidden = !(caption.textContent || note.textContent);

    const many = items.length > 1;
    counter.textContent = many ? `${index + 1} / ${items.length}` : '';
    prevBtn.hidden = nextBtn.hidden = !many;
  }

  // Scale to whichever edge binds first, upscaling images smaller than the
  // stage. One scale factor for both axes, so the ratio is exact and the
  // border stays wrapped tight to the picture.
  function fitImage(img) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
    img.style.width  = Math.floor(img.naturalWidth  * scale) + 'px';
    img.style.height = Math.floor(img.naturalHeight * scale) + 'px';
  }

  function refit() {
    const img = stage.querySelector('img');
    if (img) fitImage(img);
  }

  function restoreBorrowed() {
    if (!borrowed) return;
    borrowed.classList.remove('is-lightboxed');
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.replaceChild(borrowed, placeholder);
    }
    borrowed = null;
    placeholder = null;
  }

  function open(list, start, trigger) {
    if (!list.length) return;
    items = list;
    index = Math.max(0, Math.min(start || 0, list.length - 1));
    lastFocus = trigger || document.activeElement;
    render();
    overlay.classList.add('is-open');
    document.body.classList.add('nav-open');
    closeBtn.focus();
  }

  function close() {
    if (!overlay.classList.contains('is-open')) return;
    restoreBorrowed();
    overlay.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    stage.innerHTML = '';
    items = [];
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  function step(delta) {
    if (items.length < 2) return;
    index = (index + delta + items.length) % items.length;
    render();
  }

  function onKeydown(e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape')     { close(); return; }
    if (e.key === 'ArrowLeft')  { step(-1); return; }
    if (e.key === 'ArrowRight') { step(1);  return; }
    if (e.key !== 'Tab') return;

    // Keep focus inside the dialog.
    const focusable = Array.from(
      overlay.querySelectorAll('button:not([hidden]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function bindSwipe() {
    let x0 = null, y0 = null, dragged = false;
    stage.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; dragged = false;
    }, { passive: true });
    stage.addEventListener('touchmove', e => {
      if (x0 === null || e.touches.length !== 1) return;
      if (Math.abs(e.touches[0].clientX - x0) > 10 ||
          Math.abs(e.touches[0].clientY - y0) > 10) dragged = true;
    }, { passive: true });
    stage.addEventListener('touchend', e => {
      if (x0 === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0, dy = t.clientY - y0;
      // A drag is never a dismiss tap: touch ends synthesise a click, and
      // without this a swipe pages the gallery and then closes it.
      if (dragged) swallowClick = true;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      x0 = y0 = null;
    }, { passive: true });
  }

  /* ── triggers ────────────────────────────────────────────── */

  const itemFromImg = img => ({
    kind: 'image', src: img.currentSrc || img.src, alt: img.alt,
    caption: captionFor(img), note: noteFor(img)
  });

  function init() {
    build();

    // 1. Slideshows. The DOM holds one <img>; the real list is published by
    //    the page as JSON so the viewer can page through every slide.
    document.querySelectorAll('[data-lightbox-slides]').forEach(root => {
      const img = root.querySelector('img');
      if (!img) return;
      makeOpenable(img, () => {
        let slides = [];
        try { slides = JSON.parse(root.dataset.lightboxSlides); } catch (err) { slides = []; }
        if (!slides.length) return { list: [itemFromImg(img)], start: 0 };
        // A slide carries its own note; otherwise the slideshow's own
        // data-ai-note (if any) applies to every frame.
        const fallback = noteFor(img);
        const list = slides.map(s => ({
          kind: 'image', src: s.src, alt: s.alt || '',
          caption: s.caption || '', note: s.note || fallback
        }));
        // Follow whichever slide is currently showing.
        const here = list.findIndex(s => img.src.endsWith(s.src));
        return { list, start: here < 0 ? 0 : here };
      });
    });

    // 2. Card stacks — mobile only. On desktop the click stays with the
    //    shuffle animation, so we neither bind nor intercept.
    document.querySelectorAll('.card-stack').forEach(stack => {
      if (stack.closest('[data-no-lightbox]')) return;
      stack.classList.add('has-lightbox-mobile');
    });
    // Capture on document so this runs before the page's own bubble-phase
    // shuffle handler bound to .card-stack itself.
    document.addEventListener('click', e => {
      if (!isMobile()) return;
      const stack = e.target.closest && e.target.closest('.card-stack');
      if (!stack || stack.closest('[data-no-lightbox]')) return;
      const imgs = Array.from(stack.querySelectorAll('img'));
      if (!imgs.length) return;
      e.stopPropagation();
      e.preventDefault();
      open(imgs.map(itemFromImg), 0, stack);
    }, true);

    // 3. Live mocks — moved into the overlay, then put back.
    document.querySelectorAll('.cg-mock-frame').forEach(frame => {
      if (frame.closest('[data-no-lightbox]')) return;
      makeOpenable(frame, () => ({ list: [{ kind: 'node', el: frame }], start: 0 }));
    });

    // 4. Single images. Anything already handled above is skipped, as are
    //    iframes (frame-modal.js owns those).
    document.querySelectorAll('.img-frame img, .ref-img img').forEach(img => {
      if (img.closest('[data-no-lightbox]')) return;
      if (img.closest('.card-stack')) return;
      if (img.closest('[data-lightbox-slides]')) return;
      makeOpenable(img, () => ({ list: [itemFromImg(img)], start: 0 }));
    });
  }

  function makeOpenable(el, resolve) {
    el.classList.add('is-openable');
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    if (!el.getAttribute('aria-label')) {
      const label = el.getAttribute('alt') || 'item';
      el.setAttribute('aria-label', `Expand: ${label}`);
    }
    const fire = e => {
      e.preventDefault();
      const { list, start } = resolve();
      open(list, start, el);
    };
    el.addEventListener('click', fire);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') fire(e);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
