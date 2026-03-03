/* ============================================
   Capstack - Onboarding Module
   4-step Founder Onboarding + Match Score
   ============================================ */

const Onboarding = {
  currentStep: 0,
  totalSteps: 4,
  selections: {
    sectors: [],
    stage: '',
    geo: ''
  },

  steps: [
    {
      title: 'Welcome to Capstack 🎉',
      subtitle: "Let's personalize your funding matches in 3 quick steps.",
      render: () => `
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <div>
            <h4>Browse 2,400+ verified opportunities</h4>
            <p>Every listing is hand-verified and up-to-date</p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✦</div>
          <div>
            <h4>Get personalized match scores</h4>
            <p>See how well each opportunity fits your startup</p>
          </div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <div>
            <h4>Track all applications in one place</h4>
            <p>Never miss a deadline with our kanban board</p>
          </div>
        </div>
      `
    },
    {
      title: 'What sector are you in?',
      subtitle: "Select all that apply — we'll surface the most relevant grants and programmes.",
      render: () => `
        <div class="selection-tags">
          ${['AI / ML', 'Climate Tech', 'Health / Bio', 'Fintech', 'Deep Tech', 'Consumer', 'B2B SaaS', 'Impact / Social', 'Energy', 'Mobility', 'Gaming / Media'].map(s => `
            <button class="selection-tag ${Onboarding.selections.sectors.includes(s) ? 'selected' : ''}" data-sector="${s}">${s}</button>
          `).join('')}
        </div>
      `,
      bind: () => {
        document.querySelectorAll('.selection-tag').forEach(tag => {
          tag.addEventListener('click', () => {
            const sector = tag.dataset.sector;
            if (Onboarding.selections.sectors.includes(sector)) {
              Onboarding.selections.sectors = Onboarding.selections.sectors.filter(s => s !== sector);
              tag.classList.remove('selected');
            } else {
              Onboarding.selections.sectors.push(sector);
              tag.classList.add('selected');
            }
          });
        });
      }
    },
    {
      title: 'What stage is your startup?',
      subtitle: "We'll use this to filter funding that's actually available to you right now.",
      render: () => `
        <div class="stage-cards">
          ${[
            { icon: '💡', label: 'Idea stage', desc: "Haven't built anything yet" },
            { icon: '🛠', label: 'Building MVP', desc: 'Pre-revenue, under $50K raised' },
            { icon: '🌱', label: 'Pre-seed', desc: 'Early traction, raising first round' },
            { icon: '🌿', label: 'Seed', desc: '$250K–$2M raised' },
            { icon: '🚀', label: 'Series A+', desc: '$2M+ raised' }
          ].map(s => `
            <button class="stage-card ${Onboarding.selections.stage === s.label ? 'selected' : ''}" data-stage="${s.label}">
              <span class="stage-icon">${s.icon}</span>
              <div class="stage-info">
                <h4>${s.label}</h4>
                <p>${s.desc}</p>
              </div>
              <span class="stage-check">✓</span>
            </button>
          `).join('')}
        </div>
      `,
      bind: () => {
        document.querySelectorAll('.stage-card').forEach(card => {
          card.addEventListener('click', () => {
            document.querySelectorAll('.stage-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            Onboarding.selections.stage = card.dataset.stage;
          });
        });
      }
    },
    {
      title: 'Where is your startup based?',
      subtitle: 'Many grants are region-specific — this ensures you only see eligible opportunities.',
      render: () => `
        <div class="selection-tags">
          ${['United States', 'United Kingdom', 'Europe (EU)', 'India', 'Africa', 'Southeast Asia', 'Canada', 'Global / Remote'].map(g => `
            <button class="selection-tag ${Onboarding.selections.geo === g ? 'selected' : ''}" data-geo="${g}">${g}</button>
          `).join('')}
        </div>
      `,
      bind: () => {
        document.querySelectorAll('.selection-tag').forEach(tag => {
          tag.addEventListener('click', () => {
            document.querySelectorAll('.selection-tag').forEach(t => t.classList.remove('selected'));
            tag.classList.add('selected');
            Onboarding.selections.geo = tag.dataset.geo;
          });
        });
      }
    }
  ],

  show() {
    this.currentStep = 0;
    this.selections = { sectors: [], stage: '', geo: '' };
    this.render();
    ModalManager.open('onboarding');
  },

  render() {
    const step = this.steps[this.currentStep];

    document.getElementById('onboardingTitle').textContent = step.title;
    document.getElementById('onboardingSubtitle').textContent = step.subtitle;
    document.getElementById('onboardingBody').innerHTML = step.render();

    // Update dots
    const dotsContainer = document.getElementById('stepDots');
    dotsContainer.innerHTML = Array.from({ length: this.totalSteps }, (_, i) => `
      <div class="step-dot ${i <= this.currentStep ? 'active' : ''} ${i === this.currentStep ? 'current' : ''}"></div>
    `).join('');

    // Update progress
    const progress = (this.currentStep / (this.totalSteps - 1)) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Update button
    const nextBtn = document.getElementById('nextOnboarding');
    nextBtn.textContent = this.currentStep === this.totalSteps - 1 ? 'See my matches →' : 'Next →';

    // Bind events
    if (step.bind) step.bind();
  },

  next() {
    // Validate current step
    if (this.currentStep === 1 && this.selections.sectors.length === 0) {
      Toast.error('Please select at least one sector');
      return;
    }
    if (this.currentStep === 2 && !this.selections.stage) {
      Toast.error('Please select your startup stage');
      return;
    }
    if (this.currentStep === 3 && !this.selections.geo) {
      Toast.error('Please select your location');
      return;
    }

    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.complete();
    }
  },

  complete() {
    // Save onboarding data to user profile
    if (Auth.currentUser) {
      const users = DB.getUsers();
      const user = users.find(u => u.id === Auth.currentUser.id);
      if (user) {
        user.profile = {
          ...user.profile,
          sectors: this.selections.sectors,
          stage: this.selections.stage,
          geo: this.selections.geo,
          onboarded: true
        };
        DB.saveUsers(users);
        DB.setCurrentUser(user);
        Auth.currentUser = user;
      }
    }

    ModalManager.close('onboarding');
    Toast.success(`Perfect! Your matches are ready ✦`);
    Router.navigate('directory');
  },

  skip() {
    ModalManager.close('onboarding');
    Router.navigate('directory');
  },

  init() {
    document.getElementById('nextOnboarding')?.addEventListener('click', () => this.next());
    document.getElementById('skipOnboarding')?.addEventListener('click', () => this.skip());
  }
};

// Expose to window
window.Onboarding = Onboarding;
