import { EventUtils, DOMUtils } from './utils.js';

// Constants
const HEADER_VISIBILITY_THRESHOLD = 0;
const SCROLL_DEBOUNCE_DELAY = 100;

export const HeaderController = {
  elements: {
    header: DOMUtils.getElement('header'),
    headerTrigger: DOMUtils.getElement('#headerTrigger'),
    headerContent: DOMUtils.getElement('header > div'),
    mayuLogo: DOMUtils.getElement('header svg[id="_レイヤー_2"]'),
    menuButton: DOMUtils.getElement('[aria-label="Toggle Navigation Menu"]'),
    menuIcon: DOMUtils.getElement('[aria-label="Toggle Navigation Menu"] svg')
  },

  state: {
    isMenuOpen: false,
    isHeaderVisible: false,
    lastScrollY: window.scrollY
  },

  init() {
    if (!this.validateElements()) return;
    this.setupHeaderObserver();
    this.bindEvents();
    this.setupInitialState();
  },

  validateElements() {
    const requiredElements = ['header', 'headerTrigger', 'headerContent'];
    return requiredElements.every(key => this.elements[key] !== null);
  },

  setupInitialState() {
    this.updateHeaderVisibility();
    this.state.lastScrollY = window.scrollY;
  },

  setupHeaderObserver() {
    const observerOptions = {
      root: null,
      threshold: HEADER_VISIBILITY_THRESHOLD,
      rootMargin: '0px'
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const triggerPosition = entry.target.getBoundingClientRect().top + window.scrollY;
        this.handleHeaderVisibility(window.scrollY >= triggerPosition);
      });
    }, observerOptions);

    headerObserver.observe(this.elements.headerTrigger);
  },


  updateHeaderVisibility() {
    const scrollY = window.scrollY;
    const triggerPosition = this.elements.headerTrigger.getBoundingClientRect().top + scrollY;
    this.handleHeaderVisibility(scrollY >= triggerPosition);
    this.state.lastScrollY = scrollY;
  },

  handleHeaderVisibility(shouldShow) {
    if (this.state.isHeaderVisible === shouldShow) return;
    
    this.state.isHeaderVisible = shouldShow;
    DOMUtils.toggleClasses(this.elements.header, 'visible', shouldShow);
  },

  // Public method to update menu state
  setMenuState(isOpen) {
    this.state.isMenuOpen = isOpen;
    if (isOpen) {
      this.handleHeaderHover(false);
    }
  }
}; 