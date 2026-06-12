customElements.define('site-nav', class extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root') || '';
    const here = window.location.pathname;
    const link = (label, href) => {
      const full = `${root}${href}`;
      const isCurrent = here.endsWith(href);
      return `<a href="${full}"${isCurrent ? ' class="is-current" aria-current="page"' : ''}>${label}</a>`;
    };

    const folders = [
      {
        label: 'Graduate Work',
        groups: [
          {
            heading: 'CivicGuide',
            links: [
              link('Case Study', 'civic-guide/civic-guide-case-study.html'),
              link('Research Foundations', 'civic-guide/civic-trust-research.html'),
            ],
          },
          {
            heading: 'Chunk: A Dada Manifesto',
            links: [
              link('Case Study', 'chunk-manifesto/chunk-manifesto.html'),
            ],
          },
          {
            heading: 'Timer',
            links: [
              link('Case Study', 'timer/timer-case-study.html'),
            ],
          },
        ],
      },
      {
        label: 'UX Design',
        groups: [
          {
            heading: 'Cover Whale — Platform Redesign',
            links: [
              link('Platform Architecture &amp; Navigation', 'platform-architecture/platform-architecture.html'),
              link('The Quote Application', 'quote-application/quote-application.html'),
              link('Messages, Events &amp; Tickets', 'messages-events-tickets/messages-events-tickets.html'),
            ],
          },
        ],
      },
    ];

    const folderHTML = folders.map((folder, i) => {
      const groupHTML = folder.groups.map(g => `
        <p class="global-nav-group-label">${g.heading}</p>
        ${g.links.join('')}
      `).join('');
      return `
        <div class="global-nav-folder" data-folder="${i}">
          <button class="global-nav-folder-trigger" aria-expanded="false">${folder.label} <span class="caret">▾</span></button>
          <div class="global-nav-panel"><div class="global-nav-panel-inner">${groupHTML}</div></div>
        </div>
      `;
    }).join('');

    this.innerHTML = `
      <nav class="global-nav" aria-label="Site">
        <a class="global-nav-home" href="${root}index.html">Phil Cote</a>
        <div class="global-nav-links">${folderHTML}</div>
      </nav>
    `;

    const navFolders = this.querySelectorAll('.global-nav-folder');
    const closeAll = (except) => {
      navFolders.forEach(f => {
        if (f !== except) {
          f.classList.remove('is-open');
          f.querySelector('.global-nav-folder-trigger').setAttribute('aria-expanded', 'false');
        }
      });
    };
    navFolders.forEach(folder => {
      const trigger = folder.querySelector('.global-nav-folder-trigger');
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = folder.classList.contains('is-open');
        closeAll(folder);
        folder.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });
    document.addEventListener('click', () => closeAll(null));
  }
});
