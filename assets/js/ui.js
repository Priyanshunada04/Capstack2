/* ============================================
   Capstack - UI Utilities
   Toast, Progress Bar, Skeleton Loaders, Dates
   ============================================ */

// ============================================
// Toast Notifications
// ============================================

const Toast = {
  element: null,
  iconElement: null,
  messageElement: null,
  timeout: null,

  init() {
    this.element = document.getElementById('toast');
    this.iconElement = document.getElementById('toastIcon');
    this.messageElement = document.getElementById('toastMessage');
  },

  show(message, type = '') {
    if (!this.element) this.init();
    
    // Clear existing timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Set icon based on type
    const icons = {
      success: '✓',
      error: '✗',
      '': 'ℹ'
    };

    this.iconElement.textContent = icons[type] || icons[''];
    this.messageElement.textContent = message;

    // Set border color
    this.element.className = 'toast';
    if (type) {
      this.element.classList.add(type);
    }

    // Show toast
    this.element.classList.add('show');

    // Hide after 3 seconds
    this.timeout = setTimeout(() => {
      this.hide();
    }, 3000);
  },

  hide() {
    if (this.element) {
      this.element.classList.remove('show');
    }
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'error');
  }
};

// ============================================
// Progress Bar
// ============================================

const ProgressBar = {
  create(container, options = {}) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    if (options.className) {
      bar.classList.add(options.className);
    }

    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = '0%';

    bar.appendChild(fill);
    container.appendChild(bar);

    return {
      element: bar,
      fill: fill,
      setProgress(percent) {
        this.fill.style.width = `${Math.min(100, Math.max(0, percent))}%`;
      },
      destroy() {
        bar.remove();
      }
    };
  }
};

// ============================================
// Skeleton Loaders
// ============================================

const Skeleton = {
  createCard() {
    const card = document.createElement('div');
    card.className = 'card skeleton-card';
    card.innerHTML = `
      <div class="skeleton-header">
        <div class="skeleton skeleton-logo"></div>
        <div class="skeleton-info">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-subtitle"></div>
        </div>
      </div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton-footer">
        <div class="skeleton skeleton-tag"></div>
        <div class="skeleton skeleton-tag"></div>
      </div>
    `;
    return card;
  },

  createList(count = 3) {
    const container = document.createElement('div');
    container.className = 'skeleton-list';
    for (let i = 0; i < count; i++) {
      container.appendChild(this.createCard());
    }
    return container;
  },

  show(container, count = 3) {
    container.innerHTML = '';
    container.appendChild(this.createList(count));
  },

  hide(container) {
    const skeletonList = container.querySelector('.skeleton-list');
    if (skeletonList) {
      skeletonList.remove();
    }
  }
};

// Add skeleton styles
const skeletonStyles = document.createElement('style');
skeletonStyles.textContent = `
  .skeleton {
    background: linear-gradient(90deg, #1a1a1a 25%, #222222 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .skeleton-card {
    padding: 20px;
    margin-bottom: 16px;
  }

  .skeleton-header {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .skeleton-logo {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    flex-shrink: 0;
  }

  .skeleton-info {
    flex: 1;
  }

  .skeleton-title {
    height: 20px;
    width: 70%;
    margin-bottom: 8px;
  }

  .skeleton-subtitle {
    height: 14px;
    width: 50%;
  }

  .skeleton-text {
    height: 14px;
    width: 100%;
    margin-bottom: 8px;
  }

  .skeleton-text.short {
    width: 60%;
  }

  .skeleton-footer {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }

  .skeleton-tag {
    height: 24px;
    width: 80px;
    border-radius: 9999px;
  }
`;
document.head.appendChild(skeletonStyles);

// ============================================
// Modal Manager
// ============================================

const ModalManager = {
  modals: {},

  register(name, element) {
    if (typeof element === 'string') {
      element = document.getElementById(element);
    }
    this.modals[name] = element;

    // Close on overlay click
    element.addEventListener('click', (e) => {
      if (e.target === element) {
        this.close(name);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && element.classList.contains('open')) {
        this.close(name);
      }
    });
  },

  open(name) {
    const modal = this.modals[name];
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  close(name) {
    const modal = this.modals[name];
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    Object.keys(this.modals).forEach(name => {
      this.close(name);
    });
  }
};

// ============================================
// Date Utilities
// ============================================

const DateUtils = {
  // Format date for display
  format(date, options = {}) {
    const d = new Date(date);
    const opts = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      ...options
    };
    return d.toLocaleDateString('en-US', opts);
  },

  // Format date for input value
  formatForInput(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  },

  // Get days until deadline
  daysUntil(date) {
    const deadline = new Date(date);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  // Check if deadline is urgent (< 7 days)
  isUrgent(date) {
    return this.daysUntil(date) <= 7;
  },

  // Format relative time
  relative(timeStr) {
    return formatRelativeTime(timeStr);
  }
};

// ============================================
// Animation Utilities
// ============================================

const Animations = {
  fadeIn(element, duration = 400) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    element.style.transition = `all ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  },

  slideIn(element, direction = 'left', duration = 400) {
    const translate = direction === 'left' ? '-20px' : '20px';
    element.style.opacity = '0';
    element.style.transform = `translateX(${translate})`;
    element.style.transition = `all ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  },

  stagger(elements, delay = 50) {
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'all 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * delay);
    });
  }
};

// ============================================
// Form Utilities
// ============================================

const FormUtils = {
  // Serialize form to object
  serialize(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    return data;
  },

  // Validate email
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Validate URL
  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Clear form
  clear(form) {
    form.reset();
  },

  // Show field error
  showError(input, message) {
    const group = input.closest('.form-group');
    if (group) {
      let error = group.querySelector('.field-error');
      if (!error) {
        error = document.createElement('span');
        error.className = 'field-error';
        group.appendChild(error);
      }
      error.textContent = message;
      input.classList.add('error');
    }
  },

  // Clear field error
  clearError(input) {
    const group = input.closest('.form-group');
    if (group) {
      const error = group.querySelector('.field-error');
      if (error) {
        error.remove();
      }
      input.classList.remove('error');
    }
  }
};

// Add field error styles
const fieldErrorStyles = document.createElement('style');
fieldErrorStyles.textContent = `
  .field-error {
    display: block;
    margin-top: 4px;
    font-size: 0.75rem;
    color: #ef4444;
  }

  .input.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
`;
document.head.appendChild(fieldErrorStyles);

// ============================================
// Initialize on DOM ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
});

// Expose to window
window.Toast = Toast;
window.ProgressBar = ProgressBar;
window.Skeleton = Skeleton;
window.ModalManager = ModalManager;
window.DateUtils = DateUtils;
window.Animations = Animations;
window.FormUtils = FormUtils;
