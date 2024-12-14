export const MenuEffects = {
  config: {
    selectors: {
      menuOverlay: '#menuOverlay',
      articlesWrapper: '.articles-wrapper',
      articleLink: '.article-link',
      articleNumber: '.article-number',
      articleTitle: '.article-title',
      bgContainer: '.menu-bg-container',
      bgImage: '.menu-bg-image',
      articleItem: '.hover-area'
    },
    colors: {
      default: {
        background: 'black',
        text: 'white'
      },
      hover: {
        background: 'white',
        text: '#003BFF'
      }
    },
    articlePages: {
      'neo-retro.html': '1',
      'shin-okubo.html': '2',
      'chi-tei.html': '3',
      'uju-mura.html': '4',
      'takano-baba.html': '5'
    }
  },

  init() {
    this.menuOverlay = document.querySelector(this.config.selectors.menuOverlay);
    this.bgContainer = document.querySelector(this.config.selectors.bgContainer);
    this.hoverAreas = document.querySelectorAll(this.config.selectors.articleItem);
    this.bgImages = document.querySelectorAll(this.config.selectors.bgImage);
    
    if (this.validateElements()) {
      this.bindEvents();
      this.setActiveStateFromURL();
    }
  },

  validateElements() {
    return (
      this.menuOverlay &&
      this.bgContainer &&
      this.hoverAreas.length > 0 &&
      this.bgImages.length > 0
    );
  },

  bindEvents() {
    // Hover effects for menu items
    this.hoverAreas.forEach(area => {
      area.addEventListener('mouseenter', () => this.handleHover(area, true));
      area.addEventListener('mouseleave', () => this.handleHover(area, false));
    });

    // Handle link clicks for active states
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href && this.config.articlePages[href.split('/').pop()]) {
          this.handleLinkClick(href);
        }
      }
    });
  },

  handleHover(area, isHovered) {
    const articleId = area.getAttribute('data-article');
    
    // Handle text color changes
    const elements = {
      number: area.querySelector(this.config.selectors.articleNumber),
      title: area.querySelector(this.config.selectors.articleTitle)
    };

    const colors = this.config.colors[isHovered ? 'hover' : 'default'];

    Object.values(elements).forEach(element => {
      if (element) {
        element.style.backgroundColor = colors.background;
        element.style.color = colors.text;
      }
    });

    // Handle background image
    if (isHovered) {
      this.activateBackgroundImage(articleId);
    } else {
      const activeArticleId = document.querySelector('.article-item[data-active="true"] .hover-area')?.getAttribute('data-article');
      if (activeArticleId) {
        this.activateBackgroundImage(activeArticleId);
      } else {
        this.deactivateAllBackgrounds();
      }
    }
  },

  setActiveStateFromURL() {
    const currentPage = window.location.pathname.split('/').pop();
    const articleId = this.config.articlePages[currentPage];
    
    if (articleId) {
      this.setActiveArticle(articleId);
    }
  },

  setActiveArticle(articleId) {
    // Remove existing active states
    document.querySelectorAll('.article-item').forEach(item => {
      item.removeAttribute('data-active');
      
      // Reset styles
      const number = item.querySelector(this.config.selectors.articleNumber);
      const title = item.querySelector(this.config.selectors.articleTitle);
      if (number) {
        number.style.backgroundColor = this.config.colors.default.background;
        number.style.color = this.config.colors.default.text;
      }
      if (title) {
        title.style.backgroundColor = this.config.colors.default.background;
        title.style.color = this.config.colors.default.text;
      }
    });
    
    // Set new active state
    const activeItem = document.querySelector(`.hover-area[data-article="${articleId}"]`)?.closest('.article-item');
    if (activeItem) {
      activeItem.setAttribute('data-active', 'true');
      
      // Apply active styles
      const number = activeItem.querySelector(this.config.selectors.articleNumber);
      const title = activeItem.querySelector(this.config.selectors.articleTitle);
      if (number) {
        number.style.backgroundColor = this.config.colors.hover.background;
        number.style.color = this.config.colors.hover.text;
      }
      if (title) {
        title.style.backgroundColor = this.config.colors.hover.background;
        title.style.color = this.config.colors.hover.text;
      }
      
      this.activateBackgroundImage(articleId);
    }
  },

  activateBackgroundImage(articleId) {
    this.bgImages.forEach(img => {
      img.classList.toggle('active', img.getAttribute('data-article') === articleId);
    });
  },

  deactivateAllBackgrounds() {
    this.bgImages.forEach(img => img.classList.remove('active'));
  },

  handleLinkClick(href) {
    const articleId = this.config.articlePages[href.split('/').pop()];
    if (articleId) {
      localStorage.setItem('activeArticle', articleId);
      this.setActiveArticle(articleId);
    }
  }
};

// Initialize the effects when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  MenuEffects.init();
});
