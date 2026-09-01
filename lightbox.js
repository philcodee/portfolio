/* Fullscreen viewer for images, card stacks, slideshows and live mocks.
 *
 * Sibling of frame-modal.js, which owns iframes.
 *
 * Structure is deliberately flat: one stage filling the viewport, with the
 * chrome floating over it. The image fills the stage and uses object-fit, so
 * the browser handles aspect ratio and rotation natively -- there is no fit
 * maths, no resize handling and nothing to get out of sync.
 *
 *   .img-frame img / .ref-img img   single image
 *   .card-stack                     grouped, MOBILE ONLY (desktop click = shuffle)
 *   [data-lightbox-slides]          slideshow, pages through its whole array
 *   .cg-mock-frame                  live DOM: moved in, moved back on close
 *   [data-no-lightbox]              opt out
 */
(function () {
  const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

  let overlay, stage, counter, caption, note, closeBtn, prevBtn, nextBtn;
  let items = [], index = 0, lastFocus = null;
  let placeholder = null, borrowed = null;
  let swallowClick = false;

  // Caption is the copy already on the page -- a .caption element or a slide
  // title. Never alt: that is for screen readers.
  const captionFor = el => {
    const wrap = el.closest('.img-frame, .ref-img');
    if (!wrap) return '';
    const sib = wrap.nextElementSibling;
    if (sib && sib.classList.contains('caption')) return sib.textContent.trim();
    const own = wrap.parentElement && wrap.parentElement.querySelector(':scope > .caption');
    return own ? own.textContent.trim() : '';
  };

  const DEFAULT_NOTE = 'Image edited with AI to remove the background and improve lighting.';
  const noteFor = el => {
    const holder = el.closest('[data-ai-note]');
    if (!holder) return '';
    return holder.getAttribute('data-ai-note').trim() || DEFAULT_NOTE;
  };

  /* ── zoom ────────────────────────────────────────────────── */

  const MAX_ZOOM = 5;
  let zoom = 1, tx = 0, ty = 0;
  const isZoomed = () => zoom > 1.01;

  function apply(smooth) {
    const img = stage.querySelector('img');
    if (!img) return;
    img.style.transition = smooth ? 'transform 180ms ease' : '';
    // Belt and braces: one non-finite value would void the whole declaration.
    const x = Number.isFinite(tx) ? tx : 0;
    const y = Number.isFinite(ty) ? ty : 0;
    img.style.transform = `translate(${x}px, ${y}px) scale(${zoom})`;
  }

  function clampPan() {
    const img = stage.querySelector('img');
    if (!img) return;
    const bw = img.clientWidth, bh = img.clientHeight;
    const nw = img.naturalWidth, nh = img.naturalHeight;
    // Nothing measurable yet (image still loading). Bail rather than divide by
    // zero: a NaN in the translate invalidates the whole transform, which
    // would silently kill the zoom.
    if (!bw || !bh || !nw || !nh) return;
    // The rendered picture inside the object-fit box, not the box itself.
    const nat = nw / nh;
    let w = bw, h = bw / nat;
    if (h > bh) { h = bh; w = bh * nat; }
    const maxX = Math.max(0, (w * zoom - bw) / 2);
    const maxY = Math.max(0, (h * zoom - bh) / 2);
    tx = Math.max(-maxX, Math.min(maxX, tx));
    ty = Math.max(-maxY, Math.min(maxY, ty));
  }

  function setZoom(next, smooth) {
    zoom = Math.max(1, Math.min(MAX_ZOOM, next));
    if (zoom === 1) tx = ty = 0; else clampPan();
    apply(smooth);
    overlay.classList.toggle('is-zoomed', isZoomed());
  }

  function resetZoom() {
    zoom = 1; tx = ty = 0;
    overlay.classList.remove('is-zoomed');
    const img = stage.querySelector('img');
    if (img) { img.style.transition = ''; img.style.transform = ''; }
  }

  /* ── overlay ─────────────────────────────────────────────── */

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Expanded view');
    overlay.innerHTML = `
      <div class="lightbox-stage"></div>
      <div class="lightbox-bar">
        <span class="lightbox-counter" aria-live="polite"></span>
        <button class="lightbox-close" aria-label="Close">CLOSE</button>
      </div>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8592;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&#8594;</button>
      <p class="lightbox-caption"></p>
      <p class="lightbox-note"></p>
    `;
    document.body.appendChild(overlay);

    stage    = overlay.querySelector('.lightbox-stage');
    counter  = overlay.querySelector('.lightbox-counter');
    caption  = overlay.querySelector('.lightbox-caption');
    note     = overlay.querySelector('.lightbox-note');
    closeBtn = overlay.querySelector('.lightbox-close');
    prevBtn  = overlay.querySelector('.lightbox-prev');
    nextBtn  = overlay.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));

    overlay.addEventListener('click', e => {
      if (swallowClick) { swallowClick = false; return; }
      if (e.target.closest('.lightbox-bar, .lightbox-nav')) return;
      if (isZoomed()) { setZoom(1, true); return; }
      close();
    });

    document.addEventListener('keydown', onKeydown);
    bindGestures();
  }

  function render() {
    restoreBorrowed();
    resetZoom();
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
      img.src = item.src;
      img.alt = item.alt || '';
      stage.appendChild(img);
      caption.textContent = item.caption || '';
      note.textContent = item.note || '';
    }

    const many = items.length > 1;
    counter.textContent = many ? `${index + 1} / ${items.length}` : '';
    prevBtn.hidden = nextBtn.hidden = !many;
  }

  function restoreBorrowed() {
    if (!borrowed) return;
    borrowed.classList.remove('is-lightboxed');
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.replaceChild(borrowed, placeholder);
    }
    borrowed = null; placeholder = null;
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
    resetZoom();
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
    if (e.key === 'Escape')     { isZoomed() ? setZoom(1, true) : close(); return; }
    if (e.key === 'ArrowLeft')  { step(-1); return; }
    if (e.key === 'ArrowRight') { step(1);  return; }
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      overlay.querySelectorAll('button:not([hidden])')
    ).filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ── gestures ────────────────────────────────────────────── */

  function bindGestures() {
    let x0 = 0, y0 = 0, moved = false, maxTouches = 0;
    let pinchDist = 0, startZoom = 1, panX = 0, panY = 0, lastTap = 0;
    const gap = t => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    stage.addEventListener('touchstart', e => {
      swallowClick = false;
      if (maxTouches === 0) moved = false;
      maxTouches = Math.max(maxTouches, e.touches.length);
      if (e.touches.length === 2) {
        pinchDist = gap(e.touches); startZoom = zoom;
      } else if (e.touches.length === 1) {
        x0 = panX = e.touches[0].clientX;
        y0 = panY = e.touches[0].clientY;
      }
    }, { passive: true });

    stage.addEventListener('touchmove', e => {
      moved = true;
      if (e.touches.length === 2 && pinchDist) {
        e.preventDefault();
        setZoom(startZoom * (gap(e.touches) / pinchDist), false);
      } else if (e.touches.length === 1 && isZoomed()) {
        e.preventDefault();
        tx += e.touches[0].clientX - panX;
        ty += e.touches[0].clientY - panY;
        panX = e.touches[0].clientX; panY = e.touches[0].clientY;
        clampPan(); apply(false);
      }
    }, { passive: false });

    stage.addEventListener('touchend', e => {
      if (e.touches.length > 0) return;
      const still = maxTouches === 1 && !moved;
      const wasMulti = maxTouches > 1;
      const t = e.changedTouches[0];
      const dx = t ? t.clientX - x0 : 0, dy = t ? t.clientY - y0 : 0;
      maxTouches = 0; pinchDist = 0;

      if (moved) { swallowClick = true; setTimeout(() => { swallowClick = false; }, 400); }

      // Paging: only a clear horizontal swipe, never while zoomed or multi-touch.
      if (!still && !wasMulti && !isZoomed() &&
          Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        step(dx < 0 ? 1 : -1);
        return;
      }
      if (!still) { lastTap = 0; return; }

      const now = Date.now();
      if (now - lastTap < 300) {
        swallowClick = true;
        setTimeout(() => { swallowClick = false; }, 400);
        setZoom(isZoomed() ? 1 : 2.5, true);
        lastTap = 0;
      } else {
        lastTap = now;
      }
    }, { passive: true });

    stage.addEventListener('touchcancel', () => { maxTouches = 0; pinchDist = 0; moved = false; },
      { passive: true });

    // Trackpad pinch arrives as ctrl+wheel.
    stage.addEventListener('wheel', e => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom(zoom * (e.deltaY < 0 ? 1.12 : 0.89), false);
    }, { passive: false });
  }

  /* ── triggers ────────────────────────────────────────────── */

  const itemFromImg = img => ({
    kind: 'image', src: img.currentSrc || img.src, alt: img.alt,
    caption: captionFor(img), note: noteFor(img)
  });

  function init() {
    build();

    document.querySelectorAll('[data-lightbox-slides]').forEach(root => {
      const img = root.querySelector('img');
      if (!img) return;
      makeOpenable(img, () => {
        let slides = [];
        try { slides = JSON.parse(root.dataset.lightboxSlides); } catch (err) { slides = []; }
        if (!slides.length) return { list: [itemFromImg(img)], start: 0 };
        const fallback = noteFor(img);
        const list = slides.map(s => ({
          kind: 'image', src: s.src, alt: s.alt || '',
          caption: s.caption || '', note: s.note || fallback
        }));
        const here = list.findIndex(s => img.src.endsWith(s.src));
        return { list, start: here < 0 ? 0 : here };
      });
    });

    document.querySelectorAll('.card-stack').forEach(stack => {
      if (!stack.closest('[data-no-lightbox]')) stack.classList.add('has-lightbox-mobile');
    });
    // Capture phase, so this runs before the page's own shuffle handler.
    document.addEventListener('click', e => {
      if (!isMobile()) return;
      const stack = e.target.closest && e.target.closest('.card-stack');
      if (!stack || stack.closest('[data-no-lightbox]')) return;
      const imgs = Array.from(stack.querySelectorAll('img'));
      if (!imgs.length) return;
      e.stopPropagation(); e.preventDefault();
      open(imgs.map(itemFromImg), 0, stack);
    }, true);

    document.querySelectorAll('.cg-mock-frame').forEach(frame => {
      if (frame.closest('[data-no-lightbox]')) return;
      makeOpenable(frame, () => ({ list: [{ kind: 'node', el: frame }], start: 0 }));
    });

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
      el.setAttribute('aria-label', `Expand: ${el.getAttribute('alt') || 'item'}`);
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
