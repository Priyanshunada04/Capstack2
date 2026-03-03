/* ============================================
   Capstack - Google OAuth
   Demo Picker + Real GSI Flow
   ============================================ */

// Demo accounts for picker
const DEMO_ACCOUNTS = [
  { name: 'Alex Johnson', email: 'alex.johnson@gmail.com', initials: 'AJ', color: '#4285F4', type: 'founder' },
  { name: 'Priya Sharma', email: 'priya.sharma@gmail.com', initials: 'PS', color: '#34A853', type: 'founder' },
];

// Google Picker
const GooglePicker = {
  accounts: [],

  show() {
    const modal = document.getElementById('googlePickerModal');
    const container = document.getElementById('googleAccounts');

    // Merge saved users with demo accounts
    const savedUsers = DB.getUsers().filter(u => u.provider === 'google');
    this.accounts = [
      ...savedUsers.map(u => ({
        name: u.name,
        email: u.email,
        initials: u.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        color: u.type === 'investor' ? '#34A853' : '#4285F4',
        type: u.type,
        isReal: true,
        googleId: u.googleId
      })),
      ...DEMO_ACCOUNTS.filter(d => !savedUsers.find(u => u.email === d.email))
    ];

    // Render accounts
    container.innerHTML = this.accounts.map((acc, i) => `
      <button class="google-account" data-index="${i}">
        <div class="account-avatar" style="background: ${acc.color}">${acc.initials}</div>
        <div>
          <p class="account-name">${acc.name}</p>
          <p class="account-email">${acc.email}</p>
        </div>
      </button>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.google-account').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.selectAccount(this.accounts[index]);
      });
    });

    ModalManager.open('googlePicker');
  },

  selectAccount(account) {
    const profile = {
      name: account.name,
      email: account.email,
      picture: account.picture,
      googleId: account.googleId || `demo_${account.email}`
    };

    const result = Auth.signInWithGoogle(profile);

    ModalManager.close('googlePicker');
    ModalManager.close('auth');

    if (result.isNew) {
      Onboarding.show();
    } else {
      if (result.user.type === 'investor') {
        Router.navigate('investor');
      } else if (result.user.type === 'admin') {
        Router.navigate('admin');
      } else {
        Router.navigate('directory');
      }
    }
  },

  init() {
    // Close button
    document.getElementById('closeGooglePicker')?.addEventListener('click', () => {
      ModalManager.close('googlePicker');
    });

    // Add account button
    document.getElementById('addGoogleAccount')?.addEventListener('click', () => {
      const email = prompt('Enter email (demo mode):');
      if (email && email.includes('@')) {
        const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        this.selectAccount({
          name,
          email,
          googleId: `demo_${email}`
        });
      }
    });
  }
};

// Real Google Sign-In (for production)
const GoogleAuth = {
  clientId: null, // Set your Google Client ID

  init(clientId) {
    this.clientId = clientId;

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse.bind(this)
        });
      }
    };
  },

  handleCredentialResponse(response) {
    // Decode JWT token
    const payload = JSON.parse(atob(response.credential.split('.')[1]));

    const profile = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      googleId: payload.sub
    };

    const result = Auth.signInWithGoogle(profile);

    if (result.isNew) {
      Onboarding.show();
    } else {
      Router.navigate('directory');
    }
  },

  renderButton(containerId, options = {}) {
    if (window.google && this.clientId) {
      google.accounts.id.renderButton(
        document.getElementById(containerId),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          ...options
        }
      );
    }
  }
};

// Expose to window
window.DEMO_ACCOUNTS = DEMO_ACCOUNTS;
window.GooglePicker = GooglePicker;
window.GoogleAuth = GoogleAuth;
