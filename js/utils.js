// Event handling utilities
export const EventUtils = {
  // Debounce function for scroll and resize events
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Event delegation helper
  delegate(element, eventType, selector, handler) {
    if (!element) return;
    
    element.addEventListener(eventType, event => {
      const target = event.target.closest(selector);
      if (target) {
        handler(event, target);
      }
    });
  },

  // Touch event helper with passive listeners
  handleTouch(element, { onStart, onMove, onEnd }) {
    if (!element) return;

    let startX = 0;
    let startY = 0;

    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      onStart?.(e, { x: startX, y: startY });
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      onMove?.(e, { deltaX, deltaY });
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      onEnd?.(e, { deltaX, deltaY });
    }, { passive: true });
  }
};

// DOM utilities
export const DOMUtils = {
  // Create elements with attributes
  createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, value);
      }
    });
    children.forEach(child => {
      if (child) element.appendChild(child);
    });
    return element;
  },

  // Query elements safely
  getElement(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (e) {
      console.warn(`Invalid selector: ${selector}`);
      return null;
    }
  },

  getAllElements(selector, context = document) {
    try {
      return [...context.querySelectorAll(selector)];
    } catch (e) {
      console.warn(`Invalid selector: ${selector}`);
      return [];
    }
  },

  // Add/remove classes safely
  toggleClasses(element, classNames, force) {
    if (!element) return;
    classNames.split(' ').forEach(className => {
      if (className.trim()) {
        element.classList.toggle(className, force);
      }
    });
  },

  // Set multiple styles safely
  setStyles(element, styles) {
    if (!element || !styles) return;
    Object.entries(styles).forEach(([property, value]) => {
      if (value !== undefined && value !== null) {
        element.style[property] = value;
      }
    });
  },

  // Remove element safely
  removeElement(element) {
    element?.parentNode?.removeChild(element);
  }
};

// Animation utilities
export const AnimationUtils = {
  // Smooth scroll with fallback
  scrollTo(element, options = {}) {
    if (!element) return;
    
    const defaults = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    };

    try {
      element.scrollIntoView({ ...defaults, ...options });
    } catch (e) {
      // Fallback for older browsers
      element.scrollIntoView();
    }
  },

  // Transition helper with Promise
  transition(element, properties, duration = 300) {
    if (!element) return Promise.reject('No element provided');
    
    return new Promise(resolve => {
      const originalTransition = element.style.transition;
      element.style.transition = `all ${duration}ms ease-in-out`;

      requestAnimationFrame(() => {
        DOMUtils.setStyles(element, properties);
      });

      const handleTransitionEnd = () => {
        element.style.transition = originalTransition;
        element.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      };

      element.addEventListener('transitionend', handleTransitionEnd);

      // Fallback if transitionend doesn't fire
      setTimeout(handleTransitionEnd, duration + 50);
    });
  },

  // RAF helper for smooth animations
  animate(callback, duration) {
    const startTime = performance.now();
    
    const tick = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      callback(progress);
      
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    
    requestAnimationFrame(tick);
  }
};

// Validation utilities
export const ValidationUtils = {
  isElement(obj) {
    try {
      return obj instanceof Element || obj instanceof HTMLDocument;
    } catch (e) {
      return false;
    }
  },

  isValidSelector(selector) {
    try {
      document.createDocumentFragment().querySelector(selector);
      return true;
    } catch {
      return false;
    }
  },

  // Check if value is a valid number
  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  // Check if string is empty or whitespace
  isEmptyString(str) {
    return !str || str.trim().length === 0;
  }
}; 