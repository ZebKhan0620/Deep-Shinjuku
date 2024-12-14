import { EventUtils, DOMUtils } from './utils.js';
import { MenuEffects } from './hover-effect.js';

// Constants
const ARTICLE_SPACING = 168;

// Menu state management
const menuState = {
  isOpen: false,
  currentArticleSet: 1,
  scrollPosition: 0,
  currentYear: 2024,
  currentMonth: 1
};

// Menu DOM elements
const elements = {
  menuButton: document.querySelector('[aria-label="Toggle Navigation Menu"]'),
  menuOverlay: document.getElementById('menuOverlay'),
  header: document.querySelector('header'),
  mayuLogo: document.querySelector('header svg[id="_レイヤー_2"]'),
  menuIcon: document.querySelector('[aria-label="Toggle Navigation Menu"] svg'),
  headerContent: document.querySelector('header > div'),
  upArrow: document.querySelector('.text-center button:first-child'),
  downArrow: document.querySelector('.text-center button:last-child')
};

// Menu functionality
export const MenuController = {
  init() {
    if (!this.validateElements()) return;
    this.bindEvents();
    MenuEffects.init();
  },

  validateElements() {
    return Object.values(elements).every(element => element !== null);
  },

  bindEvents() {
    elements.menuButton.addEventListener('click', () => this.toggleMenu());
    elements.upArrow?.addEventListener('click', () => this.handleMonthChange('up'));
    elements.downArrow?.addEventListener('click', () => this.handleMonthChange('down'));
    
    // Add hover state management
    elements.upArrow?.addEventListener('mouseenter', () => this.handleArrowHover(true, 'up'));
    elements.upArrow?.addEventListener('mouseleave', () => this.handleArrowHover(false, 'up'));
    elements.downArrow?.addEventListener('mouseenter', () => this.handleArrowHover(true, 'down'));
    elements.downArrow?.addEventListener('mouseleave', () => this.handleArrowHover(false, 'down'));
  },

  toggleMenu() {
    menuState.isOpen = !menuState.isOpen;
    elements.menuButton.setAttribute('aria-expanded', menuState.isOpen);

    // Toggle menu icons
    const menuIcon = elements.menuButton.querySelector('.menu-icon');
    const closeIcon = elements.menuButton.querySelector('.menu-close-icon');
    
    if (menuState.isOpen) {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      this.openMenu();
    } else {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      this.closeMenu();
    }
  },

  openMenu() {
    menuState.scrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${menuState.scrollPosition}px`;
    document.body.style.width = '100%';

    elements.menuOverlay.style.visibility = 'visible';

    requestAnimationFrame(() => {
      elements.menuOverlay.classList.add('active');
      this.updateHeaderStyles(true);
    });
  },

  closeMenu() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    window.scrollTo({
      top: menuState.scrollPosition,
      behavior: 'instant'
    });

    elements.menuOverlay.classList.remove('active');
    this.updateHeaderStyles(false);

    setTimeout(() => {
      if (!menuState.isOpen) {
        elements.menuOverlay.style.visibility = 'hidden';
      }
    }, 300);
  },

  updateHeaderStyles(isMenuOpen) {
    const styles = isMenuOpen ? {
      headerBackground: '#FFFFFF',
      logoFill: '#000000',
      menuButtonBackground: '#000000',
      menuIconFill: '#FF2F00'
    } : {
      headerBackground: '',
      logoFill: '',
      menuButtonBackground: '',
      menuIconFill: ''
    };

    DOMUtils.setStyles(elements.headerContent, { backgroundColor: styles.headerBackground });
    DOMUtils.setStyles(elements.menuButton, { backgroundColor: styles.menuButtonBackground });
    
    if (elements.mayuLogo) {
      DOMUtils.setStyles(elements.mayuLogo, { fill: styles.logoFill });
    }

    const closeIcon = elements.menuButton.querySelector('.menu-close-icon');
    if (closeIcon) {
      DOMUtils.setStyles(closeIcon, { fill: styles.menuIconFill });
    }

    // Update header and menu state
    elements.header.classList.toggle('header-menu-open', isMenuOpen);
    document.body.classList.toggle('menu-open', isMenuOpen);
  },

  handleMonthChange(direction) {
    if (direction === 'up') {
      if (menuState.currentMonth === 1) {
        menuState.currentMonth = 12;
        menuState.currentYear--;
      } else {
        menuState.currentMonth--;
      }
    } else {
      if (menuState.currentMonth === 12) {
        menuState.currentMonth = 1;
        menuState.currentYear++;
      } else {
        menuState.currentMonth++;
      }
    }
    
    this.updateMonthDisplay();
  },

  updateMonthDisplay() {
    const yearSpan = document.querySelector('.font-dotgothic16:nth-child(2)');
    const monthSpan = document.querySelector('.font-dotgothic16:nth-child(3)');
    
    if (yearSpan && monthSpan) {
      yearSpan.textContent = `${menuState.currentYear}年`;
      monthSpan.textContent = `${menuState.currentMonth}月号`;
    }
  },

  handleArrowHover(isHovered, direction) {
    const arrow = direction === 'up' ? elements.upArrow : elements.downArrow;
    const polygon = arrow.querySelector('polygon');
    
    polygon.style.fill = isHovered ? '#FF2F00' : '#FFFFFF';
  }
}; 

