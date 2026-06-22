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
          {
            heading: 'Biome Box',
            links: [
              link('Case Study', 'biome-box/biome-box-case-study.html'),
            ],
          },
          {
            heading: 'Pontifex',
            links: [
              link('Case Study', 'pontifex/pontifex-case-study.html'),
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

    // Desktop: dropdown folders
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

    // Mobile: flat panel
    const mobileSectionsHTML = folders.map(folder => {
      const subgroupsHTML = folder.groups.map(g => `
        <div class="nav-mobile-subgroup">
          <p class="nav-mobile-subgroup-label">${g.heading}</p>
          ${g.links.join('')}
        </div>
      `).join('');
      return `
        <div class="nav-mobile-section">
          <p class="nav-mobile-section-label">${folder.label}</p>
          ${subgroupsHTML}
        </div>
      `;
    }).join('');

    this.innerHTML = `
      <nav class="global-nav" aria-label="Site">
        <a class="global-nav-home" href="${root}index.html">Phil Cote</a>
        <div class="global-nav-links">${folderHTML}</div>
        <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">MENU</button>
      </nav>
      <div class="nav-mobile-panel" aria-hidden="true">
        <div class="nav-mobile-panel-inner">${mobileSectionsHTML}</div>
      </div>
    `;

    // Desktop dropdown logic
    const navFolders = this.querySelectorAll('.global-nav-folder');
    const closeAllDropdowns = (except) => {
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
        closeAllDropdowns(folder);
        folder.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });
    document.addEventListener('click', () => closeAllDropdowns(null));

    // Mobile hamburger logic
    const hamburger = this.querySelector('.nav-hamburger');
    const mobilePanel = this.querySelector('.nav-mobile-panel');

    const closeMobileMenu = () => {
      this.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.textContent = 'MENU';
      mobilePanel.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = this.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        this.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.textContent = 'CLOSE';
        mobilePanel.setAttribute('aria-hidden', 'false');
        document.body.classList.add('nav-open');
      }
    });

    mobilePanel.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) closeMobileMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }
});
