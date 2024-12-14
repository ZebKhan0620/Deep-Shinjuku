import { MenuController } from './menu.js';
import { HeaderController } from './header.js';
import { EventUtils } from './utils.js';
import { ScrollBehavior } from './scroll-behavior.js';

// Initialize all controllers
document.addEventListener('DOMContentLoaded', () => {
  MenuController.init();
  HeaderController.init();
  ScrollBehavior.init();
  DropdownMenu.init();
});

// Handle window resize events
const handleResize = EventUtils.debounce(() => {
  MenuController.updateLayout();
}, 250);

window.addEventListener('resize', handleResize);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  window.removeEventListener('resize', handleResize);
});

export const DropdownMenu = {
  init() {
    this.menuButton = document.querySelector('[aria-label="Toggle Navigation Menu"]');
    this.menuOverlay = document.getElementById('menuOverlay');
    this.menuIcon = document.querySelector('.menu-icon');
    this.menuCloseIcon = document.querySelector('.menu-close-icon');
    
    if (this.validateElements()) {
      this.bindEvents();
    }
  },

  validateElements() {
    return (
      this.menuButton &&
      this.menuOverlay &&
      this.menuIcon &&
      this.menuCloseIcon
    );
  },

  bindEvents() {
    this.menuButton.addEventListener('click', () => this.toggleMenu());
  },

  toggleMenu() {
    const isExpanded = this.menuButton.getAttribute('aria-expanded') === 'true';
    
    // Set menu state
    this.menuButton.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle menu visibility
    if (!isExpanded) {
      // Opening menu
      document.body.classList.add('menu-open');
      this.menuOverlay.classList.add('active');
      this.menuIcon.classList.add('hidden');
      this.menuCloseIcon.classList.remove('hidden');
      
      // Ensure proper initial state of menu content
      requestAnimationFrame(() => {
        this.menuOverlay.style.opacity = '1';
      });
    } else {
      // Closing menu
      document.body.classList.remove('menu-open');
      this.menuOverlay.classList.remove('active');
      this.menuIcon.classList.remove('hidden');
      this.menuCloseIcon.classList.add('hidden');
    }
  }
};
