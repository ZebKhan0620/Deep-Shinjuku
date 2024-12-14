export const SectionEffects = {
  config: {
    selectors: {
      sections: [
        {
          trigger: '.right-image-container',
          elements: '.section-1-text > div > *',
          readMore: '.right-image-container a'
        },
        {
          trigger: '.left-image-container',
          elements: '.section-2-text > div > *',
          readMore: '.left-image-container a'
        },
        {
          trigger: '.right-image-container-2',
          elements: '.section-3-text > div > *',
          readMore: '.right-image-container-2 a'
        },
        {
          trigger: '.left-image-container-2',
          elements: '.section-4-text > div > *',
          readMore: '.left-image-container-2 a'
        },
        {
          trigger: '.right-image-container-3',
          elements: '.section-5-text > div > *',
          readMore: '.right-image-container-3 a'
        }
      ],
      colors: {
        default: {
          background: 'black',
          text: 'white'
        },
        hover: {
          background: 'white',
          text: '#003BFF'
        }
      }
    }
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    this.config.selectors.sections.forEach(section => {
      const trigger = document.querySelector(section.trigger);
      if (!trigger) return;

      trigger.addEventListener('mouseenter', () => {
        this.handleHover(section, true);
      });

      trigger.addEventListener('mouseleave', () => {
        this.handleHover(section, false);
      });
    });
  },

  handleHover(section, isHovered) {
    const colors = this.config.selectors.colors[isHovered ? 'hover' : 'default'];
    
    // Handle text elements
    const elements = document.querySelectorAll(section.elements);
    elements.forEach(element => {
      element.style.backgroundColor = colors.background;
      element.style.color = colors.text;
      element.style.transition = 'all 0.3s ease';
    });

    // Handle read more button
    const readMore = document.querySelector(section.readMore);
    if (readMore) {
      readMore.style.backgroundColor = colors.background;
      readMore.style.color = colors.text;
      readMore.style.transition = 'all 0.3s ease';
      // Also change the arrow color
      const arrow = readMore.querySelector('span:last-child');
      if (arrow) {
        arrow.style.color = colors.text;
      }
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  SectionEffects.init();
}); 