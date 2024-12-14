import { EventUtils, AnimationUtils } from './utils.js';

export const ScrollBehavior = {
  config: {
    selectors: {
      articlesWrapper: '.articles-wrapper',
      articleItem: '.article-item',
      menuOverlay: '#menuOverlay'
    },
    scrollSettings: {
      duration: 800,
      easing: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      articleSpacing: 48
    }
  },

  state: {
    isScrolling: false,
    isAtTop: true,
    touchStartY: 0,
    lastScrollTime: 0,
    scrollThrottle: 100
  },

  init() {
    this.menuOverlay = document.querySelector(this.config.selectors.menuOverlay);
    if (!this.menuOverlay) return;

    this.articlesWrapper = this.menuOverlay.querySelector(this.config.selectors.articlesWrapper);
    if (!this.articlesWrapper) return;

    this.articles = Array.from(this.articlesWrapper.querySelectorAll(this.config.selectors.articleItem));
    if (!this.articles.length) return;

    this.setupArticlesLayout();
    this.bindEvents();
    
    if (window.location.pathname.includes('takano-baba.html')) {
      this.showArticleFive();
    }
  },

  setupArticlesLayout() {
    Object.assign(this.articlesWrapper.style, {
      position: 'relative',
      zIndex: '1',
      height: 'calc(100vh - 64px - 96px)',
      overflowY: 'hidden',
      paddingRight: '16px'
    });

    // Position articles and set up initial visibility
    this.articles.forEach((article, index) => {
      Object.assign(article.style, {
        position: 'relative',
        transition: `
          transform ${this.config.scrollSettings.duration}ms cubic-bezier(0.16, 1, 0.3, 1),
          opacity ${this.config.scrollSettings.duration}ms cubic-bezier(0.16, 1, 0.3, 1)
        `,
        opacity: index === 4 ? '0' : '1',
        willChange: 'transform, opacity'
      });
    });
  },

  bindEvents() {
    // Wheel event with smoother detection
    let wheelTimeout;
    this.articlesWrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      const now = Date.now();
      
      if (now - this.state.lastScrollTime > this.state.scrollThrottle) {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          const direction = e.deltaY > 0 ? 'down' : 'up';
          this.handleScroll(direction);
        }, 50); // Small delay for smoother detection
        this.state.lastScrollTime = now;
      }
    }, { passive: false });

    // Touch events with improved sensitivity
    this.articlesWrapper.addEventListener('touchstart', (e) => {
      this.state.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.articlesWrapper.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const direction = this.state.touchStartY > touchEndY ? 'down' : 'up';
      
      if (Math.abs(this.state.touchStartY - touchEndY) > 30) { // Reduced threshold
        this.handleScroll(direction);
      }
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.menuOverlay.classList.contains('active')) return;
      
      if (e.key === 'ArrowUp' && !this.state.isAtTop) {
        e.preventDefault();
        this.handleScroll('up');
      } else if (e.key === 'ArrowDown' && this.state.isAtTop) {
        e.preventDefault();
        this.handleScroll('down');
      }
    });
  },

  handleScroll(direction) {
    if (this.state.isScrolling) return;
    
    if ((direction === 'up' && !this.state.isAtTop) || 
        (direction === 'down' && this.state.isAtTop)) {
      
      this.state.isScrolling = true;
      const translateY = direction === 'down' ? -100 : 0;

      this.articles.forEach((article, index) => {
        article.style.transform = `translateY(${translateY}%)`;
        
        if (index === 4) {
          article.style.opacity = direction === 'down' ? '1' : '0';
        }
      });

      setTimeout(() => {
        this.state.isScrolling = false;
        this.state.isAtTop = !this.state.isAtTop;
      }, this.config.scrollSettings.duration);
    }
  },

  resetScroll() {
    if (window.location.pathname.includes('takano-baba.html')) {
      this.showArticleFive();
    } else {
      this.state.isAtTop = true;
      this.articles.forEach((article, index) => {
        article.style.transform = '';
        if (index === 4) {
          article.style.opacity = '0';
        }
      });
    }
  },

  showArticleFive() {
    this.state.isAtTop = false;
    this.articles.forEach((article, index) => {
      article.style.transform = 'translateY(-100%)';
      if (index === 4) {
        article.style.opacity = '1';
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ScrollBehavior.init();
});