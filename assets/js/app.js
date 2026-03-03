/* ============================================
   Capstack - Main Application
   View Router, Modal Manager, App Init
   ============================================ */

// ============================================
// Router
// ============================================

const Router = {
  currentView: 'landing',
  
  navigate(view) {
    // Check auth
    if (typeof Auth !== 'undefined' && !Auth.canAccess(view)) {
      if (!Auth.isAuthenticated) {
        if (typeof ModalManager !== 'undefined') {
          ModalManager.open('auth');
        }
        return;
      }
      if (typeof Toast !== 'undefined') {
        Toast.error('You do not have access to this page');
      }
      return;
    }

    this.currentView = view;

    // Update nav active state
    document.querySelectorAll('.nav-links a, .admin-nav-item').forEach(link => {
      link.classList.toggle('active', link.dataset.view === view);
    });

    // Update bottom nav
    if (typeof BottomNav !== 'undefined') {
      BottomNav.render();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render view - use window object to access view modules
    const routes = {
      landing: () => window.Landing && Landing.render(),
      directory: () => window.Directory && Directory.init(),
      detail: () => window.DetailView && DetailView.render(),
      profile: () => window.Profile && Profile.render(),
      tracker: () => window.Tracker && Tracker.init(),
      investor: () => window.Investor && Investor.init(),
      admin: () => window.Admin && Admin.init()
    };
    
    if (routes[view]) {
      routes[view]();
    }

    // Close mobile menu
    if (typeof Mobile !== 'undefined') {
      Mobile.closeMenu();
    }
  }
};

// ============================================
// Landing Page View
// ============================================

const Landing = {
  render() {
    // Landing page is already in the HTML, just set up event listeners
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Sign up buttons
    document.getElementById('landingSignUp')?.addEventListener('click', () => {
      if (typeof ModalManager !== 'undefined') {
        ModalManager.open('auth');
      }
    });

    document.getElementById('ctaSignUp')?.addEventListener('click', () => {
      if (typeof ModalManager !== 'undefined') {
        ModalManager.open('auth');
      }
    });
  }
};

// ============================================
// Profile View
// ============================================

const Profile = {
  isEditing: false,
  formData: {},

  stages: ['Pre-seed', 'Seed', 'Series A', 'Series B+'],
  sectors: ['AI/ML', 'Fintech', 'Health/Bio', 'Climate', 'B2B SaaS', 'Consumer', 'Deep Tech', 'Other'],
  revenueRanges: ['Pre-revenue', '< $10K', '$10K–$50K', '$50K–$100K', '$100K–$500K', '$500K+'],
  growthRates: ['< 10%', '10–30%', '30–50%', '50–100%', '100%+'],
  teamSizes: ['1–2', '3–5', '6–10', '11–20', '20+'],
  raisingAmounts: ['$100K–$500K', '$500K–$1M', '$1M–$3M', '$3M–$5M', '$5M+'],

  init() {
    if (!Auth.currentUser) return;
    this.formData = { ...Auth.currentUser.profile };
    this.render();
  },

  render() {
    const container = document.getElementById('mainContent');
    if (!container) return;

    const user = Auth.currentUser;
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const avatarClass = user.type === 'investor' ? 'investor' : user.type === 'admin' ? 'admin' : '';
    const typeLabel = user.type === 'investor' ? '🏦 Investor' : user.type === 'admin' ? '⚡ Admin' : '🚀 Founder';

    container.innerHTML = `
      <div class="page-header">
        <div class="container">
          <h1>My Profile</h1>
          <p style="color: var(--text-muted);">Your startup details power auto-fill and match scoring.</p>
        </div>
      </div>

      <div class="container">
        <div style="max-width: 800px; margin: 0 auto;">
          <div class="detail-card">
            <div class="profile-header">
              <div class="profile-avatar ${avatarClass}">
                ${user.picture ? `<img src="${user.picture}" alt="">` : initials}
              </div>
              <div class="profile-info">
                <h2>${user.name}</h2>
                <p>${user.email}</p>
                <span class="profile-type ${avatarClass}">${typeLabel}</span>
              </div>
            </div>

            <div class="profile-actions">
              <button class="btn ${this.isEditing ? 'btn-primary' : 'btn-ghost'}" id="editProfileBtn">
                ${this.isEditing ? '✓ Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div class="form-sections">
              <div>
                <h3 class="form-section-title">Company Information</h3>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="input" data-field="companyName" value="${this.formData.companyName || ''}" ${!this.isEditing ? 'disabled' : ''} placeholder="Your company name">
                  </div>
                  <div class="form-group">
                    <label>Website</label>
                    <input type="url" class="input" data-field="website" value="${this.formData.website || ''}" ${!this.isEditing ? 'disabled' : ''} placeholder="https://...">
                  </div>
                  <div class="form-group full-width">
                    <label>One-liner Description</label>
                    <input type="text" class="input" data-field="description" value="${this.formData.description || ''}" ${!this.isEditing ? 'disabled' : ''} placeholder="What does your company do in one sentence?">
                  </div>
                </div>
              </div>

              <div>
                <h3 class="form-section-title">Stage & Sector</h3>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Funding Stage</label>
                    <select class="input" data-field="stage" ${!this.isEditing ? 'disabled' : ''}>
                      <option value="">Select...</option>
                      ${this.stages.map(s => `<option value="${s}" ${this.formData.stage === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Primary Sector</label>
                    <select class="input" data-field="sector" ${!this.isEditing ? 'disabled' : ''}>
                      <option value="">Select...</option>
                      ${this.sectors.map(s => `<option value="${s}" ${this.formData.sector === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="form-section-title">Traction</h3>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Monthly Revenue</label>
                    <select class="input" data-field="monthlyRevenue" ${!this.isEditing ? 'disabled' : ''}>
                      <option value="">Select...</option>
                      ${this.revenueRanges.map(r => `<option value="${r}" ${this.formData.monthlyRevenue === r ? 'selected' : ''}>${r}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>MoM Growth</label>
                    <select class="input" data-field="momGrowth" ${!this.isEditing ? 'disabled' : ''}>
                      <option value="">Select...</option>
                      ${this.growthRates.map(g => `<option value="${g}" ${this.formData.momGrowth === g ? 'selected' : ''}>${g}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Active Customers</label>
                    <input type="text" class="input" data-field="customers" value="${this.formData.customers || ''}" ${!this.isEditing ? 'disabled' : ''} placeholder="e.g. 1,200">
                  </div>
                  <div class="form-group">
                    <label>Team Size</label>
                    <select class="input" data-field="teamSize" ${!this.isEditing ? 'disabled' : ''}>
                      <option value="">Select...</option>
                      ${this.teamSizes.map(t => `<option value="${t}" ${this.formData.teamSize === t ? 'selected' : ''}>${t}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="form-section-title">Fundraising</h3>
                <div class="form-grid-2">
                  <div class="form-group">
                    <label>Amount Raising</label>
                    <select class="input" data-field="raisingAmount" ${!this.isEditing ? 'disabled' : ''}>
                      <option value="">Select...</option>
                      ${this.raisingAmounts.map(a => `<option value="${a}" ${this.formData.raisingAmount === a ? 'selected' : ''}>${a}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Round Type</label>
                    <input type="text" class="input" data-field="roundType" value="${this.formData.roundType || ''}" ${!this.isEditing ? 'disabled' : ''} placeholder="e.g. Seed, Series A">
                  </div>
                  <div class="form-group full-width">
                    <label>Use of Funds</label>
                    <textarea class="input" data-field="useOfFunds" rows="3" ${!this.isEditing ? 'disabled' : ''} placeholder="What will you use this funding for?">${this.formData.useOfFunds || ''}</textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tips-box" style="margin-top: 24px;">
            <h3>
              <span style="color: var(--money-green);">💡</span> Why this matters
            </h3>
            <ul class="tips-list">
              <li><span style="color: var(--money-green);">✓</span> <strong>Auto-fill applications</strong> — Your profile data pre-populates forms when you click Apply.</li>
              <li><span style="color: var(--money-green);">✓</span> <strong>Accurate match scores</strong> — We compare your stage, sector, and traction to every opportunity's requirements.</li>
              <li><span style="color: var(--money-green);">✓</span> <strong>One-time setup</strong> — Update once, benefit everywhere. No more copy-pasting the same info.</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  },

  setupEventListeners() {
    document.getElementById('editProfileBtn')?.addEventListener('click', () => {
      if (this.isEditing) {
        this.save();
      } else {
        this.isEditing = true;
        this.render();
      }
    });

    // Track form changes
    document.querySelectorAll('[data-field]').forEach(input => {
      input.addEventListener('change', (e) => {
        this.formData[e.target.dataset.field] = e.target.value;
      });
    });
  },

  save() {
    if (Auth.currentUser) {
      const users = DB.getUsers();
      const user = users.find(u => u.id === Auth.currentUser.id);
      if (user) {
        user.profile = { ...this.formData };
        DB.saveUsers(users);
        DB.setCurrentUser(user);
        Auth.currentUser = user;
      }
    }
    this.isEditing = false;
    Toast.success('Profile saved!');
    this.render();
  }
};

// ============================================
// App Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Register modals
    if (typeof ModalManager !== 'undefined') {
      ModalManager.register('auth', 'authModal');
      ModalManager.register('googlePicker', 'googlePickerModal');
      ModalManager.register('onboarding', 'onboardingModal');
      ModalManager.register('submit', 'submitModal');
      ModalManager.register('reject', 'rejectModal');
    }

    // Initialize modules
    if (typeof Auth !== 'undefined') Auth.init();
    if (typeof AuthModal !== 'undefined') AuthModal.init();
    if (typeof GooglePicker !== 'undefined') GooglePicker.init();
    if (typeof Onboarding !== 'undefined') Onboarding.init();
    if (typeof SubmitModal !== 'undefined') SubmitModal.init();
    if (typeof RejectModal !== 'undefined') RejectModal.init();
    if (typeof Mobile !== 'undefined') Mobile.init();

    // Setup nav links
    document.querySelectorAll('.nav-links a[data-view], .dropdown-links a[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate(link.dataset.view);
      });
    });

    // Setup all data-view navigation links (including landing page buttons)
    document.querySelectorAll('[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        if (view) {
          Router.navigate(view);
        }
      });
    });

    // Logo click
    document.querySelectorAll('.logo').forEach(logo => {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
      });
    });

    // Setup landing page sign up buttons
    if (typeof Landing !== 'undefined') {
      Landing.setupEventListeners();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      if (typeof BottomNav !== 'undefined') BottomNav.render();
    });

    // Scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const elementInView = (el, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 85)) {
          displayScrollElement(el);
        }
      });
    };

    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });

    // Initial check
    handleScrollAnimation();

    console.log('🚀 Capstack initialized');
  } catch (error) {
    console.error('Error initializing Capstack:', error);
  }
});

// Expose modules to window for cross-file access
window.Router = Router;
window.Landing = Landing;
window.Profile = Profile;
