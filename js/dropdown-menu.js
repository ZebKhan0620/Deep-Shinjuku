const headerTrigger = document.getElementById('headerTrigger');
const header = document.querySelector('header');
const menuButton = document.querySelector('[aria-label="Toggle Navigation Menu"]');
const menuOverlay = document.getElementById('menuOverlay');
const mayuLogo = document.querySelector('header svg[id="_レイヤー_2"]'); // MAYU logo SVG
const menuIcon = menuButton.querySelector('svg'); // Menu icon SVG
const headerContent = document.querySelector('header > div'); // Header content div
const upArrow = document.querySelector('.text-center button:first-child');
const downArrow = document.querySelector('.text-center button:last-child');
let currentYear = 2024;
let currentMonth = 1;
const articles = document.querySelectorAll('[data-article]');
let currentArticleSet = 1; // 1 for articles 1-4, 2 for article 5
let scrollPosition = 0;  // Add at top with other variables

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
    if (mayuLogo) {
      mayuLogo.style.fill = '#FF2F00';
    }
  }
});

headerContent.addEventListener('mouseleave', () => {
  // Only reset styles if menu is closed
  if (menuButton.getAttribute('aria-expanded') === 'false') {
    headerContent.style.backgroundColor = '';
    if (mayuLogo) {
      mayuLogo.style.fill = '';
    }
  }
});

menuButton.addEventListener('mouseenter', () => {
  // Only apply hover effects if menu is closed
  if (menuButton.getAttribute('aria-expanded') === 'false') {
    menuButton.style.backgroundColor = '#000000';
    menuIcon.style.fill = '#FF2F00';
    headerContent.style.backgroundColor = '#FFFFFF';
    if (mayuLogo) {
      mayuLogo.style.fill = '#000000';  // Keep logo black when hovering menu button
    }
  }
});

menuButton.addEventListener('mouseleave', () => {
  // Only reset styles if menu is closed
  if (menuButton.getAttribute('aria-expanded') === 'false') {
    menuButton.style.backgroundColor = '';
    menuIcon.style.fill = '';
    headerContent.style.backgroundColor = '';
    if (mayuLogo) {
      mayuLogo.style.fill = '';
    }
  }
});

// Toggle menu
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isExpanded);
  
  if (!isExpanded) {
    // Opening menu
    scrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    menuOverlay.classList.add('active');
    menuOverlay.style.visibility = 'visible';
    menuOverlay.style.opacity = '1';
    
    // Set fixed header styles
    headerContent.style.backgroundColor = '#FFFFFF';
    if (mayuLogo) {
      mayuLogo.style.fill = '#000000';
    }
    
    // Set fixed menu button styles
    menuButton.style.backgroundColor = '#000000';
    menuIcon.style.fill = '#FF2F00';
    
    // Reapply active states if on article page
    setArticlePageState();
  } else {
    // Closing menu
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo({
      top: scrollPosition,
      behavior: 'instant'  // Use instant to prevent smooth scrolling
    });
    menuOverlay.classList.remove('active');
    menuOverlay.style.opacity = '0';
    
    // Reset all styles
    headerContent.style.backgroundColor = '';
    if (mayuLogo) {
      mayuLogo.style.fill = '';
    }
    menuButton.style.backgroundColor = '';
    menuIcon.style.fill = '';
    
    setTimeout(() => {
      if (!menuButton.getAttribute('aria-expanded') === 'true') {
        menuOverlay.style.visibility = 'hidden';
      }
    }, 500);
  }
});

// Update constants with more refined values
const ARTICLE_SPACING = 168;
const ARTICLE_HEIGHT = 120;
const TRANSITION_DURATION = '0.4s';
const TRANSITION_TIMING = 'ease-in-out';

function updateArticlePositions(showingArticle5) {
  const articles = document.querySelectorAll('.article-item');
  
  articles.forEach((article) => {
    article.style.transition = `all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`;
    
    const articleNumber = parseInt(article.dataset.article);
    
    if (showingArticle5) {
      if (articleNumber === 1) {
        // Move Article 1 up and out
        article.style.top = `-${ARTICLE_HEIGHT + ARTICLE_SPACING}px`;
        article.style.opacity = '0';
        article.style.pointerEvents = 'none';
      } else if (articleNumber === 5) {
        // First ensure Article 5 is positioned correctly but hidden
        article.classList.remove('hidden');
        article.style.opacity = '0';
        article.style.top = '504px';
        article.style.pointerEvents = 'none';
        
        // Wait for Article 4 to move up before showing Article 5
        setTimeout(() => {
          article.style.opacity = '1';
          article.style.pointerEvents = 'auto';
        }, 200); // Half of the transition duration
      } else {
        // Move Articles 2-4 up first
        const newPosition = (articleNumber - 2) * ARTICLE_SPACING;
        article.style.top = `${newPosition}px`;
      }
    } else {
      if (articleNumber === 1) {
        article.style.top = '0';
        article.style.opacity = '1';
        article.style.pointerEvents = 'auto';
      } else if (articleNumber === 5) {
        // Hide Article 5 first
        article.style.opacity = '0';
        article.style.pointerEvents = 'none';
        
        // Then hide it completely after transition
        setTimeout(() => {
          article.classList.add('hidden');
        }, 400);
      } else {
        const newPosition = (articleNumber - 1) * ARTICLE_SPACING;
        article.style.top = `${newPosition}px`;
      }
    }
  });
}

// Update click handlers
upArrow?.addEventListener('click', () => {
  if (currentMonth === 1) {
    currentMonth = 12;
    currentYear--;
  } else {
    currentMonth--;
  }
  updateMonthDisplay(currentYear, currentMonth);
});

downArrow?.addEventListener('click', () => {
  if (currentMonth === 12) {
    currentMonth = 1;
    currentYear++;
  } else {
    currentMonth++;
  }
  updateMonthDisplay(currentYear, currentMonth);
});

// Initialize positions on load
document.addEventListener('DOMContentLoaded', () => {
  updateArticlePositions(false);
  setArticlePageState();
  createScrollIndicator();
});

function updateMonthDisplay(year, month) {
  const yearSpan = document.querySelector('.font-dotgothic16:nth-child(2)');
  const monthSpan = document.querySelector('.font-dotgothic16:nth-child(3)');
  
  if (yearSpan && monthSpan) {
    yearSpan.textContent = `${year}年`;
    monthSpan.textContent = `${month}月号`;
  }
}

// Update the background image hover handling
const hoverTriggers = document.querySelectorAll('[data-hover-trigger]');
const backgroundImages = document.querySelectorAll('[data-article]');

hoverTriggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', () => {
    const articleId = trigger.getAttribute('data-hover-trigger');
    
    // Hide all background images first
    backgroundImages.forEach(bg => bg.classList.remove('active'));
    
    // Show the hovered article's background
    const hoveredBg = document.querySelector(`[data-article="${articleId}"]`);
    if (hoveredBg) {
      hoveredBg.classList.add('active');
    }
  });

  trigger.addEventListener('mouseleave', () => {
    // Get current page's article ID
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    const currentArticleId = ARTICLE_PAGES[pageName]?.toString();
    
    // Hide all background images
    backgroundImages.forEach(bg => bg.classList.remove('active'));
    
    // Show the current page's background image
    if (currentArticleId) {
      const currentBg = document.querySelector(`[data-article="${currentArticleId}"]`);
      if (currentBg) {
        currentBg.classList.add('active');
      }
    }
  });
});

// Add after existing constants
const ARTICLE_PAGES = {
  'neo-retro.html': 1,
  'shin-okubo.html': 2,
  'chi-tei.html': 3,
  'uju-mura.html': 4,
  'takano-baba.html': 5
};

function setArticlePageState() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop();
  
  if (!ARTICLE_PAGES[pageName]) return;
  
  const articleLinks = document.querySelectorAll('[data-article-page]');
  const backgroundImages = document.querySelectorAll('[data-article]');
  
  articleLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    const isActive = linkPath === pageName;
    const articleId = ARTICLE_PAGES[linkPath];
    
    const numberSpan = link.querySelector('p span');
    const titleH3 = link.querySelector('h3');
    
    if (isActive) {
      // Set active styles for text
      numberSpan.classList.add('bg-white', 'text-[#003BFF]');
      titleH3.classList.add('bg-white', 'text-[#003BFF]');
      
      // Set active background image
      backgroundImages.forEach(bg => {
        if (bg.getAttribute('data-article') === articleId.toString()) {
          bg.classList.add('active');
        } else {
          bg.classList.remove('active');
        }
      });
      
      link.classList.add('pointer-events-none');
    } else {
      // Reset styles for other articles
      numberSpan.classList.remove('bg-white', 'text-[#003BFF]');
      titleH3.classList.remove('bg-white', 'text-[#003BFF]');
      link.classList.remove('pointer-events-none');
    }
  });
}

// Simple debounced scroll handler
let scrollTimeout;
menuOverlay?.addEventListener('wheel', (e) => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  scrollTimeout = setTimeout(() => {
    if (e.deltaY > 0 && currentArticleSet === 1) {
      currentArticleSet = 2;
      updateArticlePositions(true);
    } else if (e.deltaY < 0 && currentArticleSet === 2) {
      currentArticleSet = 1;
      updateArticlePositions(false);
    }
  }, 50);
});

// Remove article visibility toggle from arrow clicks
upArrow?.addEventListener('click', () => {
  // Only handle month changes now
});

downArrow?.addEventListener('click', () => {
  // Only handle month changes now
});

function createScrollIndicator() {
  // Create the indicator element
  const indicator = document.createElement('div');
  indicator.className = 'absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 transition-opacity duration-300';
  indicator.innerHTML = `
    <span class="text-black text-sm mb-2">Scroll for more</span>
    <svg class="w-6 h-6 animate-bounce" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  
  // Add it to the menu overlay's right side
  const rightSide = document.querySelector('.flex-1.min-h-[calc(100vh-64px)]');
  rightSide.appendChild(indicator);
  
  // Show indicator when menu is opened
  menuButton.addEventListener('click', () => {
    if (currentArticleSet === 1) {
      setTimeout(() => {
        indicator.style.opacity = '1';
      }, 500);
    }
  });
  
  // Hide indicator when scrolling starts or when Article 5 is shown
  menuOverlay?.addEventListener('wheel', () => {
    indicator.style.opacity = '0';
  }, { once: true });
}