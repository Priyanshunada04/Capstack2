/* ============================================
   Capstack - Directory Module
   Browse, Filter, Sort, Detail View, Match Pills
   ============================================ */

const Directory = {
  opportunities: [],
  filtered: [],
  filters: {
    type: ['Accelerator', 'Government Grant', 'VC / Angel', 'Foundation'],
    stage: ['Pre-seed', 'Seed'],
    geo: ['Global', 'USA', 'Europe']
  },
  sortBy: 'match',
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,

  init() {
    this.opportunities = DB.getAllOpportunities();
    this.filtered = [...this.opportunities];
    this.currentPage = 1;
    this.renderDirectoryView();
    this.setupSearch();
    this.setupFilters();
    this.setupSort();
    this.render();
  },

  renderDirectoryView() {
    const container = document.getElementById('mainContent');
    if (!container) return;

    container.innerHTML = `
      <div class="page-header">
        <div class="container">
          <h1>Find Funding</h1>
        </div>
      </div>

      <div class="container">
        <div class="directory-layout">
          <!-- Sidebar Filters -->
          <aside class="filters-sidebar" id="filtersSidebar">
            <div class="filters-header">
              <h3>Filters</h3>
              <button class="close-filters" id="closeFilters">✕</button>
            </div>

            <div class="filter-group">
              <h4>Status</h4>
              <label class="filter-option">
                <input type="checkbox" data-category="status" data-value="active" checked>
                <span>Active <span class="count">1842</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="status" data-value="closing">
                <span>Closing soon <span class="count">94</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="status" data-value="closed">
                <span>Closed <span class="count">386</span></span>
              </label>
            </div>

            <div class="filter-group">
              <h4>Type</h4>
              <label class="filter-option">
                <input type="checkbox" data-category="type" data-value="Accelerator" checked>
                <span>Accelerator <span class="count">412</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="type" data-value="Government Grant" checked>
                <span>Government Grant <span class="count">634</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="type" data-value="VC / Angel" checked>
                <span>VC / Angel <span class="count">548</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="type" data-value="Foundation" checked>
                <span>Foundation <span class="count">219</span></span>
              </label>
            </div>

            <div class="filter-group">
              <h4>Stage</h4>
              <label class="filter-option">
                <input type="checkbox" data-category="stage" data-value="Pre-seed" checked>
                <span>Pre-seed <span class="count">723</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="stage" data-value="Seed" checked>
                <span>Seed <span class="count">891</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="stage" data-value="Series A">
                <span>Series A <span class="count">334</span></span>
              </label>
            </div>

            <div class="filter-group">
              <h4>Geography</h4>
              <label class="filter-option">
                <input type="checkbox" data-category="geo" data-value="Global" checked>
                <span>Global <span class="count">398</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="geo" data-value="USA" checked>
                <span>USA <span class="count">512</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="geo" data-value="Europe" checked>
                <span>Europe <span class="count">487</span></span>
              </label>
              <label class="filter-option">
                <input type="checkbox" data-category="geo" data-value="UK">
                <span>UK <span class="count">203</span></span>
              </label>
            </div>
          </aside>

          <!-- Main Content -->
          <div class="directory-main">
            <!-- Search & Filter Bar -->
            <div class="search-filter-bar">
              <div class="search-input-wrapper">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <input type="text" id="searchInput" class="search-input" placeholder="Search funding opportunities, grants, accelerators...">
                <button class="search-clear hidden" id="searchClear">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
              <button class="filter-btn" id="filterBtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/>
                  <line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/>
                  <line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/>
                  <line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/>
                  <line x1="17" x2="23" y1="16" y2="16"/>
                </svg>
                <span>Filters</span>
                <span class="filter-badge hidden" id="filterBadge">0</span>
              </button>
            </div>

            <!-- Results Header -->
            <div class="results-header">
              <div class="results-info">
                <p id="resultsCount"><strong>30</strong> opportunities found</p>
                <span class="results-divider">|</span>
                <span class="results-updated">Updated today</span>
              </div>
              <div class="sort-dropdown-wrapper">
                <label class="sort-label">Sort by</label>
                <div class="custom-select" id="sortDropdown">
                  <button class="sort-trigger" id="sortTrigger">
                    <span id="sortLabel">Best Match</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  <div class="sort-options" id="sortOptions">
                    <button class="sort-option active" data-value="match">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Best Match
                    </button>
                    <button class="sort-option" data-value="deadline">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      Deadline (soonest)
                    </button>
                    <button class="sort-option" data-value="amount">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      Amount (highest)
                    </button>
                    <button class="sort-option" data-value="rating">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      Highest Rated
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Opportunities List -->
            <div id="opportunitiesList" class="opportunities-list"></div>

            <!-- Pagination -->
            <div id="paginationContainer"></div>
          </div>
        </div>
      </div>
    `;

    // Setup close filters button
    document.getElementById('closeFilters')?.addEventListener('click', () => {
      document.getElementById('filtersSidebar')?.classList.remove('open');
    });
  },

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.applyFilters();

        // Show/hide clear button
        if (searchClear) {
          searchClear.classList.toggle('hidden', !e.target.value);
        }
      });

      // Handle clear button
      if (searchClear) {
        searchClear.addEventListener('click', () => {
          searchInput.value = '';
          this.searchQuery = '';
          searchClear.classList.add('hidden');
          searchInput.focus();
          this.applyFilters();
        });
      }
    }
  },

  setupFilters() {
    // Filter toggle
    const filterBtn = document.getElementById('filterBtn');
    const filtersSidebar = document.getElementById('filtersSidebar');

    if (filterBtn && filtersSidebar) {
      filterBtn.addEventListener('click', () => {
        filtersSidebar.classList.toggle('open');
      });
    }

    // Filter checkboxes
    document.querySelectorAll('.filter-option input').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateFilters();
      });
    });
  },

  setupSort() {
    const sortTrigger = document.getElementById('sortTrigger');
    const sortOptions = document.getElementById('sortOptions');
    const sortLabel = document.getElementById('sortLabel');

    if (sortTrigger && sortOptions) {
      // Toggle dropdown
      sortTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        sortOptions.classList.toggle('open');
        sortTrigger.classList.toggle('open');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        sortOptions.classList.remove('open');
        sortTrigger.classList.remove('open');
      });

      // Handle option selection
      sortOptions.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', () => {
          // Update active state
          sortOptions.querySelectorAll('.sort-option').forEach(o => o.classList.remove('active'));
          option.classList.add('active');

          // Update sort
          this.sortBy = option.dataset.value;

          // Update label
          const labelMap = {
            'match': 'Best Match',
            'deadline': 'Deadline (soonest)',
            'amount': 'Amount (highest)',
            'rating': 'Highest Rated'
          };
          if (sortLabel) {
            sortLabel.textContent = labelMap[this.sortBy];
          }

          // Close dropdown and apply
          sortOptions.classList.remove('open');
          sortTrigger.classList.remove('open');
          this.applyFilters();
        });
      });
    }
  },

  updateFilters() {
    this.filters.type = [];
    this.filters.stage = [];
    this.filters.geo = [];

    document.querySelectorAll('.filter-option input:checked').forEach(cb => {
      const category = cb.dataset.category;
      const value = cb.dataset.value;
      if (this.filters[category]) {
        this.filters[category].push(value);
      }
    });

    this.applyFilters();
  },

  applyFilters() {
    this.filtered = this.opportunities.filter(opp => {
      // Search filter
      if (this.searchQuery) {
        const match = opp.name.toLowerCase().includes(this.searchQuery) ||
                     opp.org.toLowerCase().includes(this.searchQuery) ||
                     opp.desc.toLowerCase().includes(this.searchQuery) ||
                     (opp.tags && opp.tags.some(t => t.toLowerCase().includes(this.searchQuery)));
        if (!match) return false;
      }

      // Type filter
      if (this.filters.type.length > 0) {
        if (!this.filters.type.some(t => opp.type.includes(t))) return false;
      }

      // Stage filter
      if (this.filters.stage.length > 0) {
        if (!opp.stage.some(s => this.filters.stage.includes(s))) return false;
      }

      // Geo filter
      if (this.filters.geo.length > 0) {
        if (!this.filters.geo.includes(opp.geo)) return false;
      }

      return true;
    });

    // Reset to page 1 when filters change
    this.currentPage = 1;

    // Sort
    this.sort();
    this.render();
  },

  getPaginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filtered.slice(start, end);
  },

  getTotalPages() {
    return Math.ceil(this.filtered.length / this.itemsPerPage);
  },

  goToPage(page) {
    const totalPages = this.getTotalPages();
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    this.currentPage = page;
    this.render();
    // Scroll to top of results
    const resultsHeader = document.querySelector('.results-header');
    if (resultsHeader) {
      resultsHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  sort() {
    if (this.sortBy === 'deadline') {
      this.filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (this.sortBy === 'amount') {
      this.filtered.sort((a, b) => {
        const getNum = (s) => {
          const match = s.match(/[\d.]+/);
          return match ? parseFloat(match[0]) : 0;
        };
        return getNum(b.amount) - getNum(a.amount);
      });
    } else if (this.sortBy === 'rating') {
      this.filtered.sort((a, b) => (b.communityRating || 0) - (a.communityRating || 0));
    } else {
      // Default: Best Match
      this.filtered.sort((a, b) => b.matchScore - a.matchScore);
    }
  },

  render() {
    const container = document.getElementById('opportunitiesList');
    const countEl = document.getElementById('resultsCount');
    const paginationContainer = document.getElementById('paginationContainer');

    if (!container) return;

    // Update count
    if (countEl) {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(this.currentPage * this.itemsPerPage, this.filtered.length);
      countEl.innerHTML = `<strong>${this.filtered.length}</strong> opportunities found <span style="color: var(--text-muted); font-weight: 400;">(showing ${start}-${end})</span>`;
    }

    // Render cards
    if (this.filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No opportunities found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    // Get paginated items
    const paginatedItems = this.getPaginatedItems();
    container.innerHTML = paginatedItems.map(opp => this.renderCard(opp)).join('');

    // Add click handlers
    container.querySelectorAll('.opportunity-card').forEach(card => {
      card.addEventListener('click', () => {
        const oppId = parseInt(card.dataset.id);
        const opp = this.opportunities.find(o => o.id === oppId);
        if (opp) {
          DetailView.show(opp);
        }
      });
    });

    // Render pagination
    this.renderPagination(paginationContainer);
  },

  renderPagination(container) {
    if (!container) return;

    const totalPages = this.getTotalPages();

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let pagesHtml = '';

    // Previous button
    pagesHtml += `
      <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
              data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''}>
        ← Prev
      </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      // Show first 3, last 3, and pages around current
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        pagesHtml += `
          <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
            ${i}
          </button>
        `;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        pagesHtml += `<span class="pagination-ellipsis">...</span>`;
      }
    }

    // Next button
    pagesHtml += `
      <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
              data-page="${this.currentPage + 1}" ${this.currentPage === totalPages ? 'disabled' : ''}>
        Next →
      </button>
    `;

    container.innerHTML = `
      <div class="pagination">
        ${pagesHtml}
      </div>
    `;

    // Add click handlers
    container.querySelectorAll('.pagination-btn:not(.disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        this.goToPage(page);
      });
    });
  },

  renderCard(opp) {
    const typeClass = getTypeChipClass(opp.type);
    const isNew = opp.isNew ? '<span class="badge badge-green">NEW</span>' : '';

    return `
      <div class="opportunity-card ${opp.isNew ? 'new' : ''}" data-id="${opp.id}">
        <div class="opportunity-card-inner">
          <div class="opp-logo">${opp.logo}</div>
          <div class="opp-content">
            <div class="opp-header">
              <div class="opp-title-group">
                <h3>${opp.name}</h3>
                <p>${opp.org}</p>
              </div>
              <span class="opp-amount">${opp.amount}</span>
            </div>
            <p class="opp-desc">${opp.desc}</p>
            <div class="opp-meta">
              <span class="type-chip ${typeClass}">${getTypeIcon(opp.type)} ${opp.type}</span>
              <span class="tag-sm">📍 ${opp.geo}</span>
              ${opp.stage.slice(0, 1).map(s => `<span class="tag-sm">${s}</span>`).join('')}
              <span class="match-pill">✦ ${opp.matchScore}% match</span>
              <span class="deadline">📅 ${formatDate(opp.deadline)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

// Detail View
const DetailView = {
  opportunity: null,

  show(opp) {
    this.opportunity = opp;
    Router.navigate('detail');
  },

  render() {
    const container = document.getElementById('mainContent');
    if (!container || !this.opportunity) return;

    const opp = this.opportunity;
    const typeClass = getTypeChipClass(opp.type);

    container.innerHTML = `
      <div class="page-header">
        <div class="container">
          <a href="#" class="detail-back" data-back>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            Back to opportunities
          </a>
        </div>
      </div>

      <div class="container">
        <div class="detail-content">
          <div class="detail-card">
            <div class="detail-header">
              <div class="detail-logo">${opp.logo}</div>
              <div class="detail-title-group">
                <h1>${opp.name}</h1>
                <p>${opp.org} · ${opp.type} · ${opp.geo}</p>
                <div class="detail-badges">
                  <span class="badge badge-green">● Active</span>
                  ${opp.isNew ? '<span class="badge badge-green">NEW</span>' : ''}
                </div>
              </div>
            </div>

            <div class="trust-panel">
              <h3>Trust & Verification</h3>
              <div class="trust-grid">
                <div class="trust-item">
                  <label>Status</label>
                  <span class="value verified">✓ Active</span>
                </div>
                <div class="trust-item">
                  <label>Last Verified</label>
                  <span class="value verified">✓ ${opp.verified}</span>
                </div>
                <div class="trust-item">
                  <label>Community Rating</label>
                  <div class="stars">
                    ${this.renderStars(opp.communityRating || 0)}
                  </div>
                </div>
                <div class="trust-item">
                  <label>Reviews</label>
                  <span class="value">${opp.reviewCount || 0} founders</span>
                </div>
              </div>
            </div>

            <div class="detail-actions">
              <button class="btn btn-primary" id="saveToTracker">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Save to Tracker
              </button>
              <a href="${opp.applyUrl}" target="_blank" class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                Apply Now
              </a>
              <button class="btn btn-ghost" id="flagOpportunity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
                Flag as outdated
              </button>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-card">
              <label>Amount</label>
              <span class="value green">${opp.amount}</span>
            </div>
            <div class="info-card">
              <label>Deadline</label>
              <span class="value">${formatDate(opp.deadline)}</span>
            </div>
            <div class="info-card">
              <label>Stage</label>
              <span class="value">${opp.stage.join(' · ')}</span>
            </div>
          </div>

          <div class="section-card">
            <h2>About This Programme</h2>
            <p>${opp.fullDesc || opp.desc}</p>
          </div>

          ${opp.eligibility ? `
            <div class="section-card">
              <h2>Eligibility Criteria</h2>
              <ul class="eligibility-list">
                ${opp.eligibility.map(e => `
                  <li>
                    <span class="icon ${e.ok ? 'ok' : 'no'}">${e.ok ? '✓' : '✗'}</span>
                    <span>${e.text}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="section-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h2>Your Match</h2>
              <span class="match-pill">✦ ${opp.matchScore}% match</span>
            </div>
            <div class="match-score-bar">
              <div class="match-score-fill" style="width: ${opp.matchScore}%"></div>
            </div>
            <p style="font-size: 0.875rem; color: var(--text-muted);">
              Based on your profile: Seed-stage B2B, USA, $28K MRR, AI/Supply Chain.
            </p>
          </div>

          ${opp.reviews ? `
            <div class="section-card">
              <h2>Founder Reviews (${opp.reviewCount})</h2>
              ${opp.reviews.map(r => `
                <div class="review-card">
                  <div class="review-header">
                    <span class="name">${r.name}</span>
                    <span class="date">${r.date}</span>
                  </div>
                  <div class="stars">${this.renderStars(r.rating)}</div>
                  <p>${r.text}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="section-card cta-gradient" style="text-align: center;">
            <h2 style="margin-bottom: 8px;">Ready to apply?</h2>
            <p style="margin-bottom: 24px;">Complete your profile to unlock auto-fill for this application.</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
              <button class="btn btn-primary" id="saveToTracker2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Save to Tracker
              </button>
              <a href="${opp.applyUrl}" target="_blank" class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                Apply Now
              </a>
              <a href="#" class="btn btn-ghost" data-view="profile">Complete My Profile</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    container.querySelector('[data-back]')?.addEventListener('click', (e) => {
      e.preventDefault();
      Router.navigate('directory');
    });

    container.querySelectorAll('#saveToTracker, #saveToTracker2').forEach(btn => {
      btn.addEventListener('click', () => {
        Tracker.addItem(opp);
      });
    });

    container.querySelector('#flagOpportunity')?.addEventListener('click', () => {
      Toast.success('Thanks for flagging. We\'ll review within 24 hours.');
    });
  },

  renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => `
      <svg class="star ${i < Math.round(rating) ? 'filled' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    `).join('');
  }
};

// Expose to window
window.Directory = Directory;
window.DetailView = DetailView;
