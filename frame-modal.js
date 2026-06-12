(function () {
  function init() {
    const frames = document.querySelectorAll('.img-frame');
    const eligible = Array.from(frames).filter(f => f.querySelector('iframe'));
    if (!eligible.length) return;

    // Inject modal once
    const modal = document.createElement('div');
    modal.className = 'iframe-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="iframe-modal-bar">
        <button class="iframe-modal-close" aria-label="Close">CLOSE</button>
      </div>
      <div class="iframe-modal-body">
        <iframe></iframe>
      </div>
    `;
    document.body.appendChild(modal);

    const frameEl  = modal.querySelector('.iframe-modal-body iframe');
    const closeBtn = modal.querySelector('.iframe-modal-close');

    function openModal(src) {
      frameEl.src = src;
      modal.classList.add('is-open');
      document.body.classList.add('nav-open');
    }

    function closeModal() {
      modal.classList.remove('is-open');
      frameEl.src = '';
      document.body.classList.remove('nav-open');
    }

    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Add tap overlay to each eligible frame — always, shown/hidden via CSS
    eligible.forEach(frame => {
      const iframe = frame.querySelector('iframe');
      const src    = iframe.getAttribute('src');

      // Wrap iframe in a clip container so overflow: hidden doesn't eat the
      // parent's ::after dither shadow
      const clip = document.createElement('div');
      clip.className = 'iframe-clip';
      iframe.parentNode.insertBefore(clip, iframe);
      clip.appendChild(iframe);
      const title  = iframe.getAttribute('title') || '';

      const overlay = document.createElement('div');
      overlay.className = 'iframe-tap-overlay';
      overlay.setAttribute('role', 'button');
      overlay.setAttribute('tabindex', '0');
      overlay.setAttribute('aria-label', `Expand: ${title}`);
      overlay.innerHTML = `<span class="iframe-tap-label">Tap to expand ↗</span>`;

      overlay.addEventListener('click', () => openModal(src));
      overlay.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') openModal(src);
      });

      frame.appendChild(overlay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
