/* ============================================
   Capstack - Mobile Module
   Hamburger Drawer, Bottom Tab Bar
   ============================================ */

const Mobile = {
  menuOpen: false,

  init() {
    this.setupMenuToggle();
    this.setupNavLinks();
    this.setupTouchGestures();
  },

  setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      this.menuOpen = !this.menuOpen;
      mobileMenu.classList.toggle('open', this.menuOpen);

      // Update icon
      menuToggle.innerHTML = this.menuOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.menuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        this.closeMenu();
      }
    });
  },

  setupNavLinks() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    mobileMenu.querySelectorAll('a[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        Router.navigate(view);
        this.closeMenu();
      });
    });
  },

  setupTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  },

  handleSwipe(startX, endX) {
    const threshold = 100;
    const diff = endX - startX;

    // Swipe right from left edge - open menu
    if (diff > threshold && startX < 50) {
      this.openMenu();
    }

    // Swipe left - close menu
    if (diff < -threshold && this.menuOpen) {
      this.closeMenu();
    }
  },

  openMenu() {
    this.menuOpen = true;
    document.getElementById('mobileMenu')?.classList.add('open');
  },

  closeMenu() {
    this.menuOpen = false;
    document.getElementById('mobileMenu')?.classList.remove('open');

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
      menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    }
  },

  // Check if device is touch
  isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches;
  },

  // Get viewport width
  getViewportWidth() {
    return window.innerWidth;
  },

  // Check if mobile view
  isMobileView() {
    return this.getViewportWidth() <= 900;
  }
};

// Bottom Tab Bar (for mobile app-like experience)
const BottomNav = {
  tabs: [
    { id: 'directory', label: 'Browse', icon: '🔍' },
    { id: 'tracker', label: 'Tracker', icon: '📊', auth: true, founder: true },
    { id: 'profile', label: 'Profile', icon: '👤', auth: true, founder: true },
    { id: 'investor', label: 'Dashboard', icon: '📈', auth: true, investor: true }
  ],

  render() {
    if (!Mobile.isMobileView()) return;

    const existing = document.getElementById('bottomNav');
    if (existing) existing.remove();

    const visibleTabs = this.tabs.filter(tab => {
      if (!tab.auth) return true;
      if (!Auth.isAuthenticated) return false;
      if (tab.founder) return Auth.currentUser?.type === 'founder';
      if (tab.investor) return Auth.currentUser?.type === 'investor' || Auth.currentUser?.type === 'admin';
      return true;
    });

    if (visibleTabs.length <= 1) return;

    const nav = document.createElement('nav');
    nav.id = 'bottomNav';
    nav.className = 'bottom-nav';
    nav.innerHTML = visibleTabs.map(tab => `
      <button class="bottom-nav-item ${Router.currentView === tab.id ? 'active' : ''}" data-view="${tab.id}">
        <span class="bottom-nav-icon">${tab.icon}</span>
        <span class="bottom-nav-label">${tab.label}</span>
      </button>
    `).join('');

    document.body.appendChild(nav);

    // Add styles
    if (!document.getElementById('bottomNavStyles')) {
      const styles = document.createElement('style');
      styles.id = 'bottomNavStyles';
      styles.textContent = `
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-primary);
          padding: 8px 0;
          z-index: 100;
        }
        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          color: var(--text-muted);
          font-size: 0.625rem;
        }
        .bottom-nav-item.active {
          color: var(--money-green);
        }
        .bottom-nav-icon {
          font-size: 1.25rem;
        }
        main {
          padding-bottom: 80px;
        }
      `;
      document.head.appendChild(styles);
    }

    // Add listeners
    nav.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        Router.navigate(item.dataset.view);
      });
    });
  }
};

// Expose to window
window.Mobile = Mobile;
window.BottomNav = BottomNav;
