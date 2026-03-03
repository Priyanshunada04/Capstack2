/* ============================================
   Capstack - Admin Module
   Submission Queue, User Table, Activity Log
   ============================================ */

const Admin = {
  activePanel: 'overview',
  submissions: [],
  users: [],
  activityLog: [],

  panels: [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'queue', label: 'Review Queue', icon: '⏳' },
    { id: 'live', label: 'Live Listings', icon: '✓' },
    { id: 'flagged', label: 'Flagged', icon: '⚑' },
    { id: 'rejected', label: 'Rejected', icon: '✗' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'activity', label: 'Activity Log', icon: '📋' }
  ],

  init() {
    this.loadData();
    this.render();
  },

  loadData() {
    this.submissions = DB.getSubmissions();
    this.users = DB.getUsers();
    this.activityLog = DB.getActivityLog();
  },

  getStats() {
    return {
      pending: this.submissions.filter(s => s.status === 'pending').length,
      live: this.submissions.filter(s => s.status === 'live').length,
      rejected: this.submissions.filter(s => s.status === 'rejected').length,
      flagged: this.submissions.filter(s => s.status === 'flagged').length,
      totalViews: this.submissions.reduce((acc, s) => acc + (s.views || 0), 0),
      totalUsers: this.users.length
    };
  },

  getFilteredSubmissions() {
    switch (this.activePanel) {
      case 'queue': return this.submissions.filter(s => s.status === 'pending');
      case 'live': return this.submissions.filter(s => s.status === 'live');
      case 'flagged': return this.submissions.filter(s => s.status === 'flagged');
      case 'rejected': return this.submissions.filter(s => s.status === 'rejected');
      default: return [];
    }
  },

  render() {
    const container = document.getElementById('mainContent');
    if (!container) return;

    container.innerHTML = `
      <div class="page-header">
        <div class="container">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background: var(--money-green-glow); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 1.25rem;">⚡</span>
            </div>
            <div>
              <h1>Admin Panel</h1>
              <p style="color: var(--text-muted);">Manage submissions, users, and platform activity.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="admin-layout">
          <aside class="admin-sidebar">
            <nav class="admin-nav">
              ${this.panels.map(p => `
                <button class="admin-nav-item ${this.activePanel === p.id ? 'active' : ''}" data-panel="${p.id}">
                  <span>${p.icon}</span>
                  ${p.label}
                </button>
              `).join('')}
            </nav>
          </aside>

          <div class="admin-content">
            <h2>${this.panels.find(p => p.id === this.activePanel)?.label}</h2>
            ${this.renderPanel()}
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  },

  renderPanel() {
    switch (this.activePanel) {
      case 'overview': return this.renderOverview();
      case 'queue':
      case 'live':
      case 'flagged':
      case 'rejected': return this.renderSubmissionsList();
      case 'users': return this.renderUsers();
      case 'activity': return this.renderActivityLog();
      default: return '';
    }
  },

  renderOverview() {
    const stats = this.getStats();

    return `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
        <div class="stat-card">
          <label>Pending Review</label>
          <span class="value amber">${stats.pending}</span>
        </div>
        <div class="stat-card">
          <label>Live Listings</label>
          <span class="value green">${stats.live}</span>
        </div>
        <div class="stat-card">
          <label>Total Views</label>
          <span class="value">${stats.totalViews.toLocaleString()}</span>
        </div>
        <div class="stat-card">
          <label>Total Users</label>
          <span class="value">${stats.totalUsers}</span>
        </div>
      </div>

      <div class="section-card">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          ${this.activityLog.slice(0, 5).map(item => `
            <div class="activity-item">
              <span class="activity-icon">${item.icon}</span>
              <span class="activity-text">${item.text}</span>
              <span class="activity-time">${formatRelativeTime(item.time)}</span>
            </div>
          `).join('')}
          ${this.activityLog.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 32px;">No activity yet</p>' : ''}
        </div>
      </div>
    `;
  },

  renderSubmissionsList() {
    const submissions = this.getFilteredSubmissions();

    if (submissions.length === 0) {
      return `<p style="color: var(--text-muted); text-align: center; padding: 48px;">No submissions in this category</p>`;
    }

    return `
      <div class="submissions-list">
        ${submissions.map(sub => `
          <div class="submission-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <h3>${sub.name}</h3>
                  <span class="badge ${this.getStatusBadgeClass(sub.status)}">${sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span>
                </div>
                <p style="color: var(--text-muted); margin-bottom: 8px;">${sub.org}</p>
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 12px;">${sub.desc}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                  <span class="tag-sm">${sub.type}</span>
                  <span class="tag-sm">${sub.geo}</span>
                  <span class="tag-sm" style="color: var(--money-green);">${sub.amount}</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--text-muted);">
                  Submitted by: ${sub.contact || 'Anonymous'} · ${formatDate(sub.submittedAt)}
                </p>
              </div>
              <div class="admin-actions">
                ${sub.status === 'pending' ? `
                  <button class="approve" data-id="${sub.id}">✓ Approve</button>
                  <button class="reject" data-id="${sub.id}">✗ Reject</button>
                  <button class="flag" data-id="${sub.id}">⚑ Flag</button>
                ` : ''}
                ${sub.status === 'live' ? `
                  <button class="revoke" data-id="${sub.id}">↩ Revoke</button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderUsers() {
    return `
      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Joined</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            ${this.users.map(user => `
              <tr>
                <td data-label="User">
                  <div class="user-cell">
                    <div class="user-cell-avatar ${user.type}">${user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</div>
                    <div class="user-cell-info">
                      <p>${user.name}</p>
                      <span>${user.email}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Type">
                  <span class="badge ${user.type === 'investor' ? 'badge-blue' : user.type === 'admin' ? 'badge-amber' : 'badge-green'}">
                    ${user.type === 'investor' ? '🏦' : user.type === 'admin' ? '⚡' : '🚀'} ${user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  </span>
                </td>
                <td data-label="Joined">${formatDate(user.createdAt)}</td>
                <td data-label="Provider">${user.provider || 'Email'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderActivityLog() {
    return `
      <div class="section-card">
        <div class="activity-list">
          ${this.activityLog.map(item => `
            <div class="activity-item">
              <span class="activity-icon">${item.icon}</span>
              <span class="activity-text">${item.text}</span>
              <span class="activity-time">${formatRelativeTime(item.time)}</span>
            </div>
          `).join('')}
          ${this.activityLog.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 32px;">No activity yet</p>' : ''}
        </div>
      </div>
    `;
  },

  getStatusBadgeClass(status) {
    const classes = {
      pending: 'badge-amber',
      live: 'badge-green',
      rejected: 'badge-red',
      flagged: 'badge-amber'
    };
    return classes[status] || 'badge-green';
  },

  setupEventListeners() {
    // Panel navigation
    document.querySelectorAll('.admin-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.activePanel = item.dataset.panel;
        this.render();
      });
    });

    // Admin actions
    document.querySelectorAll('.admin-actions .approve').forEach(btn => {
      btn.addEventListener('click', () => this.approveSubmission(btn.dataset.id));
    });

    document.querySelectorAll('.admin-actions .reject').forEach(btn => {
      btn.addEventListener('click', () => RejectModal.show(btn.dataset.id));
    });

    document.querySelectorAll('.admin-actions .flag').forEach(btn => {
      btn.addEventListener('click', () => this.flagSubmission(btn.dataset.id));
    });

    document.querySelectorAll('.admin-actions .revoke').forEach(btn => {
      btn.addEventListener('click', () => this.revokeSubmission(btn.dataset.id));
    });
  },

  approveSubmission(id) {
    const subs = DB.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;

    sub.status = 'live';
    sub.approvedAt = new Date().toISOString();
    DB.saveSubmissions(subs);
    DB.logActivity('✅', `Approved: <strong>${sub.name}</strong> by ${sub.org} — now live in directory`, 'green');

    Toast.success(`✓ "${sub.name}" is now live in the directory`);
    this.loadData();
    this.render();
  },

  rejectSubmission(id, reason) {
    const subs = DB.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;

    sub.status = 'rejected';
    sub.rejectReason = reason;
    sub.rejectedAt = new Date().toISOString();
    DB.saveSubmissions(subs);
    DB.logActivity('✗', `Rejected: <strong>${sub.name}</strong> — "${reason.substring(0, 50)}..."`, 'red');

    Toast.error(`"${sub.name}" rejected`);
    this.loadData();
    this.render();
  },

  flagSubmission(id) {
    const subs = DB.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;

    sub.status = 'flagged';
    DB.saveSubmissions(subs);
    DB.logActivity('⚑', `Flagged for review: <strong>${sub.name}</strong> by ${sub.org}`, 'gold');

    Toast.show(`"${sub.name}" flagged for further review`);
    this.loadData();
    this.render();
  },

  revokeSubmission(id) {
    const subs = DB.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;

    sub.status = 'pending';
    delete sub.approvedAt;
    DB.saveSubmissions(subs);
    DB.logActivity('↩', `Revoked live listing: <strong>${sub.name}</strong> — returned to pending`, 'gold');

    Toast.show(`"${sub.name}" revoked — moved back to pending`);
    this.loadData();
    this.render();
  }
};

// Reject Modal
const RejectModal = {
  targetId: null,
  selectedReason: '',

  reasons: [
    '🔍 Duplicate — we already have this opportunity listed',
    '📋 Incomplete information — key fields are missing or vague',
    '❌ Cannot verify — organisation or programme cannot be confirmed',
    '🚫 Ineligible type — does not meet Capstack listing standards',
    '💀 Expired — this programme has already closed or ended'
  ],

  show(id) {
    this.targetId = id;
    this.selectedReason = '';
    this.render();
    ModalManager.open('reject');
  },

  render() {
    const container = document.getElementById('rejectReasons');
    if (!container) return;

    container.innerHTML = this.reasons.map(r => `
      <button type="button" class="reject-reason ${this.selectedReason === r ? 'selected' : ''}" data-reason="${r}">${r}</button>
    `).join('');

    // Add listeners
    container.querySelectorAll('.reject-reason').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedReason = btn.dataset.reason;
        this.render();
      });
    });

    // Reset note
    document.getElementById('rejectNote').value = '';
  },

  confirm() {
    const customNote = document.getElementById('rejectNote').value;
    const reason = this.selectedReason || customNote || 'No reason provided';

    Admin.rejectSubmission(this.targetId, reason);
    ModalManager.close('reject');
  },

  init() {
    document.getElementById('cancelReject')?.addEventListener('click', () => {
      ModalManager.close('reject');
    });

    document.getElementById('confirmReject')?.addEventListener('click', () => {
      this.confirm();
    });
  }
};

// Expose to window
window.Admin = Admin;
window.RejectModal = RejectModal;
