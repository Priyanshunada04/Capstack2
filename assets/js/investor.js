/* ============================================
   Capstack - Investor Module
   Submit Opportunities, Investor Dashboard
   ============================================ */

const Investor = {
  submissions: [],
  activeTab: 'all',

  tabs: [
    { id: 'all', label: 'All Submissions' },
    { id: 'pending', label: 'Pending Review' },
    { id: 'live', label: 'Live' },
    { id: 'rejected', label: 'Rejected' }
  ],

  init() {
    if (!Auth.currentUser) return;
    this.submissions = DB.getSubmissions().filter(s => s.userId === Auth.currentUser.id);
    this.render();
  },

  getStats() {
    return {
      total: this.submissions.length,
      live: this.submissions.filter(s => s.status === 'live').length,
      pending: this.submissions.filter(s => s.status === 'pending').length,
      views: this.submissions.reduce((acc, s) => acc + (s.views || 0), 0)
    };
  },

  getFilteredSubmissions() {
    if (this.activeTab === 'all') return this.submissions;
    return this.submissions.filter(s => s.status === this.activeTab);
  },

  render() {
    const container = document.getElementById('mainContent');
    if (!container) return;

    const stats = this.getStats();

    container.innerHTML = `
      <div class="page-header">
        <div class="container">
          <div class="dashboard-header">
            <div class="dashboard-title">
              <h1>Investor Dashboard</h1>
              <p>Manage your funding opportunities and track performance.</p>
            </div>
            <button class="btn btn-primary" id="submitOpportunityBtn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
              Submit Opportunity
            </button>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <label>Total Submissions</label>
            <span class="value">${stats.total}</span>
          </div>
          <div class="stat-card">
            <label>Live Listings</label>
            <span class="value green">${stats.live}</span>
          </div>
          <div class="stat-card">
            <label>Pending Review</label>
            <span class="value amber">${stats.pending}</span>
          </div>
          <div class="stat-card">
            <label>Total Views</label>
            <span class="value with-icon">
              ${stats.views}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </span>
          </div>
        </div>

        <div class="tabs">
          ${this.tabs.map(t => `
            <button class="tab ${this.activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>
          `).join('')}
        </div>

        <div class="submissions-list">
          ${this.renderSubmissions()}
        </div>

        <div class="tips-box" style="margin-top: 32px;">
          <h3>
            <span style="color: var(--money-green);">💡</span> Submission Tips
          </h3>
          <ul class="tips-list">
            <li><span style="color: var(--money-green);">✓</span> <strong>Be specific</strong> — Include exact amounts, deadlines, and eligibility criteria.</li>
            <li><span style="color: var(--money-green);">✓</span> <strong>Verify first</strong> — Make sure the programme is active and accepting applications.</li>
            <li><span style="color: var(--money-green);">✓</span> <strong>Include contact</strong> — Provide a way for founders to reach out with questions.</li>
          </ul>
        </div>
      </div>
    `;

    this.setupEventListeners();
  },

  renderSubmissions() {
    const submissions = this.getFilteredSubmissions();

    if (submissions.length === 0) {
      return `
        <div class="empty-state" style="background: var(--bg-secondary); border-radius: var(--radius-xl); border: 1px solid var(--border-primary);">
          <div class="empty-icon">+</div>
          <h3>No submissions yet</h3>
          <p>Submit your first opportunity to get started.</p>
          <button class="btn btn-primary" id="submitOpportunityBtn2">Submit Opportunity</button>
        </div>
      `;
    }

    return submissions.map(sub => this.renderSubmissionCard(sub)).join('');
  },

  renderSubmissionCard(sub) {
    const statusClasses = {
      pending: { class: 'badge-amber', icon: '⏳' },
      live: { class: 'badge-green', icon: '✓' },
      rejected: { class: 'badge-red', icon: '✗' },
      flagged: { class: 'badge-amber', icon: '⚑' }
    };

    const status = statusClasses[sub.status] || statusClasses.pending;

    return `
      <div class="submission-card">
        <div class="submission-header">
          <div class="submission-title-group">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <h3>${sub.name}</h3>
              <span class="badge ${status.class}">${status.icon} ${sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span>
            </div>
            <p>${sub.org}</p>
            <div class="submission-meta">
              <span>${sub.type}</span>
              <span class="separator">·</span>
              <span>${sub.geo}</span>
              <span class="separator">·</span>
              <span>${sub.amount}</span>
              <span class="separator">·</span>
              <span>Deadline: ${formatDate(sub.deadline)}</span>
            </div>
            ${sub.status === 'rejected' && sub.rejectReason ? `
              <div class="rejection-reason">
                <strong>Reason:</strong> ${sub.rejectReason}
              </div>
            ` : ''}
          </div>
          <div class="submission-stats">
            <div class="submission-views">
              <span class="count">${sub.views || 0}</span>
              <label>views</label>
            </div>
            <a href="${sub.url}" target="_blank" class="btn btn-ghost" style="padding: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            </a>
          </div>
        </div>
        <div class="submission-footer">
          <span>Submitted ${formatDate(sub.submittedAt)}</span>
          ${sub.approvedAt ? `<span class="separator">·</span><span class="approved">Approved ${formatDate(sub.approvedAt)}</span>` : ''}
        </div>
      </div>
    `;
  },

  setupEventListeners() {
    // Submit button
    document.getElementById('submitOpportunityBtn')?.addEventListener('click', () => {
      SubmitModal.show();
    });
    document.getElementById('submitOpportunityBtn2')?.addEventListener('click', () => {
      SubmitModal.show();
    });

    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeTab = tab.dataset.tab;
        this.render();
      });
    });
  }
};

// Submit Opportunity Modal
const SubmitModal = {
  selectedStages: ['Pre-seed', 'Seed'],
  eligibility: [{ ok: true, text: '' }, { ok: false, text: '' }],

  show() {
    this.selectedStages = ['Pre-seed', 'Seed'];
    this.eligibility = [{ ok: true, text: '' }, { ok: false, text: '' }];
    this.render();
    ModalManager.open('submit');
  },

  render() {
    // Reset form
    const form = document.getElementById('submitForm');
    if (form) form.reset();

    // Update stage tags
    document.querySelectorAll('#stageTags .tag').forEach(tag => {
      tag.classList.toggle('selected', this.selectedStages.includes(tag.dataset.stage));
    });

    // Render eligibility
    this.renderEligibility();

    // Setup listeners
    this.setupListeners();
  },

  renderEligibility() {
    const container = document.getElementById('eligibilityList');
    if (!container) return;

    container.innerHTML = this.eligibility.map((item, i) => `
      <div class="eligibility-row">
        <div class="eligibility-toggle">
          <button type="button" class="${item.ok ? 'positive' : ''}" data-index="${i}" data-type="ok">✓</button>
          <button type="button" class="${!item.ok ? 'negative' : ''}" data-index="${i}" data-type="no">✗</button>
        </div>
        <input type="text" class="input eligibility-text" data-index="${i}" value="${item.text}" placeholder="e.g. Must be incorporated in EU member state">
        <button type="button" class="btn-icon remove-criterion" data-index="${i}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" x2="19" y1="12" y2="12"/></svg>
        </button>
      </div>
    `).join('');
  },

  setupListeners() {
    // Stage tags
    document.querySelectorAll('#stageTags .tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const stage = tag.dataset.stage;
        if (this.selectedStages.includes(stage)) {
          this.selectedStages = this.selectedStages.filter(s => s !== stage);
          tag.classList.remove('selected');
        } else {
          this.selectedStages.push(stage);
          tag.classList.add('selected');
        }
      });
    });

    // Add criterion
    document.getElementById('addCriterion')?.addEventListener('click', () => {
      this.eligibility.push({ ok: true, text: '' });
      this.renderEligibility();
      this.setupEligibilityListeners();
    });

    this.setupEligibilityListeners();

    // Cancel
    document.getElementById('cancelSubmit')?.addEventListener('click', () => {
      ModalManager.close('submit');
    });

    // Confirm submit
    document.getElementById('confirmSubmit')?.addEventListener('click', () => {
      this.submit();
    });

    // Character count
    const descInput = document.querySelector('textarea[name="desc"]');
    if (descInput) {
      descInput.addEventListener('input', (e) => {
        const count = e.target.value.length;
        const counter = e.target.parentElement.querySelector('.char-count');
        if (counter) counter.textContent = `${count} / 280`;
      });
    }
  },

  setupEligibilityListeners() {
    // Toggle buttons
    document.querySelectorAll('.eligibility-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const type = btn.dataset.type;
        this.eligibility[index].ok = type === 'ok';
        this.renderEligibility();
        this.setupEligibilityListeners();
      });
    });

    // Text inputs
    document.querySelectorAll('.eligibility-text').forEach(input => {
      input.addEventListener('input', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.eligibility[index].text = e.target.value;
      });
    });

    // Remove buttons
    document.querySelectorAll('.remove-criterion').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.eligibility.splice(index, 1);
        this.renderEligibility();
        this.setupEligibilityListeners();
      });
    });
  },

  submit() {
    const form = document.getElementById('submitForm');
    const formData = new FormData(form);

    const submission = {
      name: formData.get('name'),
      org: formData.get('org'),
      type: formData.get('type'),
      geo: formData.get('geo'),
      amount: formData.get('amount'),
      deadline: formData.get('deadline'),
      url: formData.get('url'),
      desc: formData.get('desc'),
      fullDesc: formData.get('fullDesc'),
      stage: this.selectedStages,
      eligibility: this.eligibility.filter(e => e.text.trim()),
      tags: formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean) || [],
      contact: formData.get('contact'),
      website: formData.get('website'),
      id: 'sub_' + Date.now(),
      userId: Auth.currentUser.id,
      status: 'pending',
      views: 0,
      submittedAt: new Date().toISOString()
    };

    // Validate
    if (!submission.name || !submission.org || !submission.type || !submission.geo ||
        !submission.amount || !submission.deadline || !submission.url || !submission.desc) {
      Toast.error('Please fill in all required fields');
      return;
    }

    // Save
    const subs = DB.getSubmissions();
    subs.push(submission);
    DB.saveSubmissions(subs);

    ModalManager.close('submit');
    Toast.success('Submitted! We\'ll review within 48 hours ✓');

    // Refresh investor view
    Investor.submissions = subs.filter(s => s.userId === Auth.currentUser.id);
    Investor.render();
  },

  init() {
    // Close button
    document.getElementById('closeSubmitModal')?.addEventListener('click', () => {
      ModalManager.close('submit');
    });
  }
};

// Expose to window
window.Investor = Investor;
window.SubmitModal = SubmitModal;
