/* ============================================
   Capstack - Authentication Module
   Sign-in, Sign-up, Logout, Nav State
   ============================================ */

// Auth State
const Auth = {
  currentUser: null,
  isAuthenticated: false,

  // Initialize auth state
  init() {
    this.currentUser = DB.getCurrentUser();
    this.isAuthenticated = !!this.currentUser;
    this.updateNavState();
    this.setupEventListeners();
  },

  // Update navigation based on auth state
  updateNavState() {
    const userMenu = document.getElementById('userMenu');
    const signInBtn = document.getElementById('signInBtn');
    const mobileSignInBtn = document.getElementById('mobileSignInBtn');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (this.isAuthenticated && this.currentUser) {
      // Show user menu, hide sign in button
      userMenu.classList.remove('hidden');
      signInBtn.classList.add('hidden');
      if (mobileSignInBtn) mobileSignInBtn.classList.add('hidden');

      // Update user info
      this.updateUserDisplay();

      // Show/hide nav links based on user type
      navLinks.forEach(link => {
        const isFounderOnly = link.classList.contains('founder-only');
        const isInvestorOnly = link.classList.contains('investor-only');
        const isAdminOnly = link.classList.contains('admin-only');
        const isAuthOnly = link.classList.contains('auth-only');

        let shouldShow = !isAuthOnly;

        if (isFounderOnly) {
          shouldShow = this.currentUser.type === 'founder';
        } else if (isInvestorOnly) {
          shouldShow = this.currentUser.type === 'investor' || this.currentUser.type === 'admin';
        } else if (isAdminOnly) {
          shouldShow = this.currentUser.type === 'admin' || this.currentUser.email === ADMIN_EMAIL;
        }

        link.style.display = shouldShow ? '' : 'none';
      });
    } else {
      // Show sign in button, hide user menu
      userMenu.classList.add('hidden');
      signInBtn.classList.remove('hidden');
      if (mobileSignInBtn) mobileSignInBtn.classList.remove('hidden');

      // Hide auth-only nav links
      navLinks.forEach(link => {
        if (link.classList.contains('auth-only')) {
          link.style.display = 'none';
        }
      });
    }
  },

  // Update user display in nav
  updateUserDisplay() {
    if (!this.currentUser) return;

    const initials = this.currentUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const avatarClass = this.currentUser.type === 'investor' ? 'investor' : 
                       this.currentUser.type === 'admin' ? 'admin' : '';

    const typeLabel = this.currentUser.type === 'investor' ? '🏦 Investor' : 
                     this.currentUser.type === 'admin' ? '⚡ Admin' : '🚀 Founder';

    // Nav user button
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');

    if (this.currentUser.picture) {
      userAvatar.innerHTML = `<img src="${this.currentUser.picture}" alt="">`;
    } else {
      userAvatar.textContent = initials;
    }
    userAvatar.className = `user-avatar ${avatarClass}`;
    userName.textContent = this.currentUser.name.split(' ')[0];

    // Dropdown
    const dropdownAvatar = document.getElementById('dropdownAvatar');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const userType = document.getElementById('userType');

    if (this.currentUser.picture) {
      dropdownAvatar.innerHTML = `<img src="${this.currentUser.picture}" alt="">`;
    } else {
      dropdownAvatar.textContent = initials;
    }
    dropdownAvatar.className = `dropdown-avatar ${avatarClass}`;
    dropdownName.textContent = this.currentUser.name;
    dropdownEmail.textContent = this.currentUser.email;
    userType.textContent = typeLabel;
    userType.className = `user-type ${avatarClass}`;
  },

  // Sign in with email/password
  signIn(email, password) {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin_001',
        name: 'Capstack Admin',
        email: ADMIN_EMAIL,
        type: 'admin',
        createdAt: new Date().toISOString()
      };
      this.setUser(adminUser);
      Toast.success('Welcome back, Admin ⚡');
      return { success: true, user: adminUser };
    }

    // Regular user login
    const users = DB.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    this.setUser(user);
    Toast.success(`Welcome back, ${user.name.split(' ')[0]}! 👋`);
    return { success: true, user };
  },

  // Sign up new user
  signUp(userData) {
    const users = DB.getUsers();

    // Check if email exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Create new user
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      type: userData.type || 'founder',
      createdAt: new Date().toISOString(),
      profile: {}
    };

    users.push(newUser);
    DB.saveUsers(users);
    this.setUser(newUser);

    if (newUser.type === 'investor') {
      Toast.success(`Welcome, ${newUser.name.split(' ')[0]}! Let's get your listings live. 🚀`);
    }

    return { success: true, user: newUser };
  },

  // Google sign in
  signInWithGoogle(profile) {
    const users = DB.getUsers();
    let user = users.find(u => u.email === profile.email);

    if (user) {
      // Update picture if needed
      if (profile.picture && !user.picture) {
        user.picture = profile.picture;
        DB.saveUsers(users);
      }
      this.setUser(user);
      Toast.success(`Welcome back, ${user.name.split(' ')[0]}! 👋`);
      return { success: true, user, isNew: false };
    } else {
      // Create new Google user
      const newUser = {
        id: 'guser_' + Date.now(),
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        googleId: profile.googleId,
        type: 'founder',
        provider: 'google',
        createdAt: new Date().toISOString(),
        profile: {}
      };
      users.push(newUser);
      DB.saveUsers(users);
      this.setUser(newUser);
      return { success: true, user: newUser, isNew: true };
    }
  },

  // Set current user
  setUser(user) {
    this.currentUser = user;
    this.isAuthenticated = true;
    DB.setCurrentUser(user);
    this.updateNavState();
  },

  // Logout
  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    DB.clearCurrentUser();
    this.updateNavState();
    Toast.show('Signed out. See you soon! 👋');
    Router.navigate('landing');
  },

  // Check if user can access view
  canAccess(view) {
    if (!this.isAuthenticated) {
      return view === 'landing' || view === 'directory';
    }

    if (view === 'admin') {
      return this.currentUser.type === 'admin' || this.currentUser.email === ADMIN_EMAIL;
    }

    if (view === 'investor') {
      return this.currentUser.type === 'investor' || this.currentUser.type === 'admin';
    }

    if (view === 'profile' || view === 'tracker') {
      return this.currentUser.type === 'founder';
    }

    return true;
  },

  // Setup event listeners
  setupEventListeners() {
    // User menu toggle
    const userBtn = document.getElementById('userBtn');
    const userMenu = document.getElementById('userMenu');

    if (userBtn) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('open');
      });

      // Close on outside click
      document.addEventListener('click', () => {
        userMenu.classList.remove('open');
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    }

    // Sign in button
    const signInBtn = document.getElementById('signInBtn');
    const mobileSignInBtn = document.getElementById('mobileSignInBtn');

    const openAuth = () => {
      ModalManager.open('auth');
    };

    if (signInBtn) signInBtn.addEventListener('click', openAuth);
    if (mobileSignInBtn) mobileSignInBtn.addEventListener('click', openAuth);

    // Settings link
    const settingsLink = document.getElementById('settingsLink');
    if (settingsLink) {
      settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        Toast.show('Settings coming soon!');
      });
    }
  }
};

// ============================================
// Auth Modal Handler
// ============================================

const AuthModal = {
  mode: 'signin',
  selectedType: 'founder',

  init() {
    this.setupTabs();
    this.setupUserTypeSelect();
    this.setupForm();
    this.setupGoogleButton();
    this.setupSwitchLink();
    this.setupCloseButton();
  },

  setupCloseButton() {
    const closeBtn = document.getElementById('closeAuthModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        ModalManager.close('auth');
        this.resetForm();
      });
    }
  },

  setupTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.mode = tab.dataset.tab;
        this.updateForm();
      });
    });
  },

  setupUserTypeSelect() {
    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedType = btn.dataset.type;
      });
    });
  },

  setupForm() {
    const form = document.getElementById('authForm');
    const submitBtn = document.getElementById('authSubmitBtn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorEl = document.getElementById('authError');

      errorEl.classList.add('hidden');
      submitBtn.textContent = 'Please wait...';
      submitBtn.disabled = true;

      // Simulate network delay
      await new Promise(r => setTimeout(r, 500));

      if (this.mode === 'signin') {
        const result = Auth.signIn(email, password);
        if (result.success) {
          ModalManager.close('auth');
          this.resetForm();

          // Navigate based on user type
          if (result.user.type === 'investor') {
            Router.navigate('investor');
          } else if (result.user.type === 'admin') {
            Router.navigate('admin');
          } else {
            Router.navigate('directory');
          }
        } else {
          errorEl.textContent = result.error;
          errorEl.classList.remove('hidden');
        }
      } else {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const name = `${firstName} ${lastName}`.trim();

        const result = Auth.signUp({
          name,
          email,
          password,
          type: this.selectedType
        });

        if (result.success) {
          ModalManager.close('auth');
          this.resetForm();

          if (result.user.type === 'investor') {
            Router.navigate('investor');
          } else {
            // Show onboarding for founders
            Onboarding.show();
          }
        } else {
          errorEl.textContent = result.error;
          errorEl.classList.remove('hidden');
        }
      }

      submitBtn.textContent = this.mode === 'signin' ? 'Sign In' : 'Create Account';
      submitBtn.disabled = false;
    });
  },

  setupGoogleButton() {
    const googleBtn = document.getElementById('googleSignInBtn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        GooglePicker.show();
      });
    }
  },

  setupSwitchLink() {
    const switchLink = document.getElementById('switchLink');
    const switchText = document.getElementById('switchText');

    switchLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.mode = this.mode === 'signin' ? 'signup' : 'signin';

      // Update tabs
      document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === this.mode);
      });

      this.updateForm();
    });
  },

  updateForm() {
    const nameFields = document.getElementById('nameFields');
    const userTypeSelect = document.getElementById('userTypeSelect');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('switchText');
    const switchLink = document.getElementById('switchLink');
    const errorEl = document.getElementById('authError');

    if (this.mode === 'signin') {
      nameFields.classList.add('hidden');
      userTypeSelect.classList.add('hidden');
      submitBtn.textContent = 'Sign In';
      switchText.textContent = "Don't have an account?";
      switchLink.textContent = 'Sign up free';
    } else {
      nameFields.classList.remove('hidden');
      userTypeSelect.classList.remove('hidden');
      submitBtn.textContent = 'Create Account';
      switchText.textContent = 'Already have an account?';
      switchLink.textContent = 'Sign in';
    }

    errorEl.classList.add('hidden');
  },

  resetForm() {
    document.getElementById('authForm').reset();
    document.getElementById('authError').classList.add('hidden');
  }
};

// Expose to window
window.Auth = Auth;
window.AuthModal = AuthModal;
