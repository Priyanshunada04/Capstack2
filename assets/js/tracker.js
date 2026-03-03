/* ============================================
   Capstack - Tracker Module
   Kanban Board, Per-user localStorage
   ============================================ */

const Tracker = {
  items: [],
  draggedItem: null,
  editingNote: null,

  columns: [
    { id: 'saved', label: 'Saved', color: 'saved' },
    { id: 'inprogress', label: 'In Progress', color: 'inprogress' },
    { id: 'submitted', label: 'Submitted', color: 'submitted' },
    { id: 'decision', label: 'Decision', color: 'decision' }
  ],

  init() {
    if (!Auth.currentUser) return;
    this.items = DB.getTrackerItems(Auth.currentUser.id);
    this.render();
  },

  addItem(opp) {
    if (!Auth.currentUser) {
      ModalManager.open('auth');
      return;
    }

    // Check if already in tracker
    if (this.items.find(i => String(i.oppId) === String(opp.id))) {
      Toast.show('Already in your tracker!');
      return;
    }

    const item = {
      oppId: opp.id,
      name: opp.name,
      org: opp.org,
      amount: opp.amount,
      deadline: opp.deadline,
      matchScore: opp.matchScore,
      logo: opp.logo,
      status: 'saved',
      addedAt: new Date().toISOString()
    };

    this.items.push(item);
    this.save();
    Toast.success(`"${opp.name}" saved to tracker 📊`);

    // If on tracker page, re-render
    if (Router.currentView === 'tracker') {
      this.render();
    }
  },

  save() {
    if (Auth.currentUser) {
      DB.saveTrackerItems(Auth.currentUser.id, this.items);
    }
  },

  updateStatus(oppId, status) {
    const item = this.items.find(i => String(i.oppId) === String(oppId));
    if (item) {
      item.status = status;
      this.save();
      this.render();
    }
  },

  deleteItem(oppId) {
    this.items = this.items.filter(i => String(i.oppId) !== String(oppId));
    this.save();
    this.render();
  },

  updateNote(oppId, note) {
    const item = this.items.find(i => String(i.oppId) === String(oppId));
    if (item) {
      item.note = note;
      this.save();
      this.render();
    }
  },

  getColumnItems(status) {
    return this.items.filter(i => i.status === status);
  },

  render() {
    const container = document.getElementById('mainContent');
    if (!container) return;

    container.innerHTML = `
      <div class="page-header">
        <div class="container">
          <h1>Application Tracker</h1>
          <p style="color: var(--text-muted);">Drag cards between columns to track your progress.</p>
        </div>
      </div>

      <div class="container">
        <div class="kanban-board">
          ${this.columns.map(col => this.renderColumn(col)).join('')}
        </div>

        <div class="kanban-legend">
          <div class="legend-item">
            <div class="legend-item-header">
              <div class="kanban-dot saved"></div>
              <h4>Saved</h4>
            </div>
            <p>Opportunities you've bookmarked but haven't started yet.</p>
          </div>
          <div class="legend-item">
            <div class="legend-item-header">
              <div class="kanban-dot inprogress"></div>
              <h4>In Progress</h4>
            </div>
            <p>Applications you've started but haven't submitted.</p>
          </div>
          <div class="legend-item">
            <div class="legend-item-header">
              <div class="kanban-dot submitted"></div>
              <h4>Submitted</h4>
            </div>
            <p>Applications you've sent. Waiting for a response.</p>
          </div>
          <div class="legend-item">
            <div class="legend-item-header">
              <div class="kanban-dot decision"></div>
              <h4>Decision</h4>
            </div>
            <p>Final outcomes — accepted, rejected, or withdrawn.</p>
          </div>
        </div>
      </div>
    `;

    this.setupDragAndDrop();
  },

  renderColumn(col) {
    const items = this.getColumnItems(col.id);

    return `
      <div class="kanban-column" data-column="${col.id}">
        <div class="kanban-header">
          <div class="kanban-header-left">
            <div class="kanban-dot ${col.color}"></div>
            <h3>${col.label}</h3>
          </div>
          <span class="kanban-count">${items.length}</span>
        </div>
        <div class="kanban-items">
          ${items.length === 0 ? '<p style="text-align: center; color: var(--text-muted); padding: 32px 0;">Drop items here</p>' : ''}
          ${items.map(item => this.renderCard(item)).join('')}
        </div>
      </div>
    `;
  },

  renderCard(item) {
    return `
      <div class="kanban-card" draggable="true" data-id="${item.oppId}">
        <div class="kanban-card-header">
          <div class="kanban-card-logo">${item.logo}</div>
          <div class="kanban-card-actions">
            <button class="note-btn" data-id="${item.oppId}" title="Add note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
            <button class="delete-btn delete" data-id="${item.oppId}" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <h4>${item.name}</h4>
        <p>${item.org}</p>
        <div class="kanban-card-meta">
          <span class="amount">${item.amount}</span>
          <span class="deadline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            ${formatDate(item.deadline)}
          </span>
        </div>
        ${item.note ? `<div class="kanban-card-note">${item.note}</div>` : ''}
        ${this.editingNote === String(item.oppId) ? `
          <div class="note-editor">
            <textarea rows="2" placeholder="Add a note...">${item.note || ''}</textarea>
            <div class="note-editor-actions">
              <button class="btn btn-primary save-note" data-id="${item.oppId}">Save</button>
              <button class="btn btn-ghost cancel-note">Cancel</button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  setupDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-column');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        this.draggedItem = this.items.find(i => String(i.oppId) === String(card.dataset.id));
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        this.draggedItem = null;
      });
    });

    columns.forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      col.addEventListener('drop', (e) => {
        e.preventDefault();
        const status = col.dataset.column;
        if (this.draggedItem && this.draggedItem.status !== status) {
          this.updateStatus(this.draggedItem.oppId, status);
        }
      });
    });

    // Note buttons
    document.querySelectorAll('.note-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editingNote = btn.dataset.id;
        this.render();
      });
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Remove from tracker?')) {
          this.deleteItem(btn.dataset.id);
        }
      });
    });

    // Save note
    document.querySelectorAll('.save-note').forEach(btn => {
      btn.addEventListener('click', () => {
        const textarea = btn.closest('.note-editor').querySelector('textarea');
        this.updateNote(btn.dataset.id, textarea.value);
        this.editingNote = null;
      });
    });

    // Cancel note
    document.querySelectorAll('.cancel-note').forEach(btn => {
      btn.addEventListener('click', () => {
        this.editingNote = null;
        this.render();
      });
    });
  }
};

// Expose to window
window.Tracker = Tracker;
