const headerTrigger = document.getElementById('headerTrigger');
const header = document.querySelector('header');
const menuButton = document.querySelector('[aria-label="Toggle Navigation Menu"]');
const menuOverlay = document.getElementById('menuOverlay');
const mayuLogo = document.querySelector('#_レイヤー_2'); // MAYU logo SVG
const menuIcon = menuButton.querySelector('svg'); // Menu icon SVG
const headerContent = document.querySelector('header > div'); // Header content div
const upArrow = document.querySelector('.text-center button:first-child');
const downArrow = document.querySelector('.text-center button:last-child');
let currentMonth = 1;
const articles = document.querySelectorAll('[data-article]');
let currentArticleSet = 1; // 1 for articles 1-4, 2 for article 5

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: '0px'
};

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const triggerPosition = entry.target.getBoundingClientRect().top + window.scrollY;
    
    if (window.scrollY >= triggerPosition) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  });
}, observerOptions);

let lastScrollY = window.scrollY;

if (headerTrigger) {
  headerObserver.observe(headerTrigger);
}

// Add hover effects
headerContent.addEventListener('mouseenter', (e) => {
  // Only apply header hover if menu is closed
  if (!e.target.closest('[aria-label="Toggle Navigation Menu"]') && 
      menuButton.getAttribute('aria-expanded') === 'false') {
    headerContent.style.backgroundColor = '#000000';
    mayuLogo.style.fill = '#FF2F00';
  }
});

headerContent.addEventListener('mouseleave', () => {
  // Only reset styles if menu is closed
  if (menuButton.getAttribute('aria-expanded') === 'false') {
    headerContent.style.backgroundColor = '';
    mayuLogo.style.fill = '';
  }
});

menuButton.addEventListener('mouseenter', () => {
  // Only apply hover effects if menu is closed
  if (menuButton.getAttribute('aria-expanded') === 'false') {
    menuButton.style.backgroundColor = '#000000';
    menuIcon.style.fill = '#FF2F00';
    headerContent.style.backgroundColor = '#FFFFFF';
  }
});

menuButton.addEventListener('mouseleave', () => {
  // Only reset styles if menu is closed
  if (menuButton.getAttribute('aria-expanded') === 'false') {
    menuButton.style.backgroundColor = '';
    menuIcon.style.fill = '';
    headerContent.style.backgroundColor = '';
  }
});

// Toggle menu
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  
  menuButton.setAttribute('aria-expanded', !isExpanded);
  
  if (!isExpanded) {
    // Opening menu - Set fixed styles
    menuOverlay.classList.add('active');
    menuOverlay.style.visibility = 'visible';
    menuOverlay.style.opacity = '1';
    
    // Set fixed header styles
    headerContent.style.backgroundColor = '#FFFFFF';
    mayuLogo.style.fill = '#000000';
    
    // Set fixed menu button styles
    menuButton.style.backgroundColor = '#000000';
    menuIcon.style.fill = '#FF2F00';
    
  } else {
    // Closing menu - Reset everything
    menuOverlay.classList.remove('active');
    menuOverlay.style.opacity = '0';
    
    // Reset all styles
    headerContent.style.backgroundColor = '';
    mayuLogo.style.fill = '';
    menuButton.style.backgroundColor = '';
    menuIcon.style.fill = '';
    
    setTimeout(() => {
      if (!menuButton.getAttribute('aria-expanded') === 'true') {
        menuOverlay.style.visibility = 'hidden';
      }
    }, 500);
  }
});

// Update these constants with more precise values
const ARTICLE_SPACING = 168; // Based on the actual spacing in HTML
const ARTICLE_HEIGHT = 120;

function updateArticlePositions(showingArticle5) {
  const articles = document.querySelectorAll('.article-item');
  
  articles.forEach((article) => {
    const articleNumber = parseInt(article.dataset.article);
    
    if (showingArticle5) {
      if (articleNumber === 1) {
        // Move Article 1 up and fade out
        article.style.top = `-${ARTICLE_HEIGHT + ARTICLE_SPACING}px`;
        article.style.opacity = '0';
        article.style.pointerEvents = 'none';
      } else if (articleNumber === 5) {
        // Show Article 5 in position 4 (where Article 4 was)
        article.style.top = `504px`; // Match Article 4's position
        article.classList.remove('hidden'); // Remove hidden class
        requestAnimationFrame(() => {
          article.style.opacity = '1';
          article.style.pointerEvents = 'auto';
        });
      } else {
        // Move Articles 2-4 up one position
        const newPosition = (articleNumber - 2) * ARTICLE_SPACING;
        article.style.top = `${newPosition}px`;
      }
    } else {
      // Reset to original positions
      if (articleNumber === 1) {
        article.style.top = '0';
        article.style.opacity = '1';
        article.style.pointerEvents = 'auto';
      } else if (articleNumber === 5) {
        article.style.opacity = '0';
        article.style.pointerEvents = 'none';
        setTimeout(() => {
          article.classList.add('hidden');
        }, 300);
      } else {
        const newPosition = (articleNumber - 1) * ARTICLE_SPACING;
        article.style.top = `${newPosition}px`;
      }
    }
  });
}

// Update click handlers
upArrow?.addEventListener('click', () => {
  if (currentArticleSet === 2) {
    currentArticleSet = 1;
    updateArticlePositions(false);
  }
});

downArrow?.addEventListener('click', () => {
  if (currentArticleSet === 1) {
    currentArticleSet = 2;
    updateArticlePositions(true);
  }
});

// Initialize positions on load
document.addEventListener('DOMContentLoaded', () => {
  updateArticlePositions(false);
});

function updateMonthDisplay() {
  const monthText = document.querySelector('.font-dotgothic16 + .font-dotgothic16');
  if (monthText) {
    // Update the month text based on which set is showing
    if (currentArticleSet === 1) {
      monthText.textContent = '2024年 1月号';
    } else {
      monthText.textContent = '2024年 2月号';
    }
  }
}

// Update the background image hover handling
const hoverTriggers = document.querySelectorAll('[data-hover-trigger]');
const backgroundImages = document.querySelectorAll('[data-article]');

hoverTriggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', () => {
    const articleId = trigger.getAttribute('data-hover-trigger');
    const correspondingBg = document.querySelector(`[data-article="${articleId}"]:not(.group)`);
    
    // Remove active class from all backgrounds
    backgroundImages.forEach(bg => {
      if (!bg.classList.contains('group')) {
        bg.classList.remove('active');
      }
    });
    
    // Add active class to corresponding background
    if (correspondingBg) {
      correspondingBg.classList.add('active');
    }
  });

  trigger.addEventListener('mouseleave', () => {
    // Remove active class from all backgrounds when not hovering
    backgroundImages.forEach(bg => {
      if (!bg.classList.contains('group')) {
        bg.classList.remove('active');
      }
    });
  });
});