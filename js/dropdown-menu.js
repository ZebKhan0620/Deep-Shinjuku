const headerTrigger = document.getElementById('headerTrigger');
const header = document.querySelector('header');
const menuButton = document.querySelector('[aria-label="Toggle Navigation Menu"]');
const menuOverlay = document.getElementById('menuOverlay');
const mayuLogo = document.querySelector('#_レイヤー_2'); // MAYU logo SVG
const menuIcon = menuButton.querySelector('svg'); // Menu icon SVG
const headerContent = document.querySelector('header > div'); // Header content div
const upArrow = document.querySelector('.arrow-up');
const downArrow = document.querySelector('.arrow-down');
let currentMonth = 1;

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
    document.body.style.overflow = 'hidden';
    
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
    document.body.style.overflow = 'auto';
    
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

// Month navigation
upArrow?.addEventListener('click', () => {
  currentMonth = currentMonth > 1 ? currentMonth - 1 : 12;
  updateMonthDisplay();
});

downArrow?.addEventListener('click', () => {
  currentMonth = currentMonth < 12 ? currentMonth + 1 : 1;
  updateMonthDisplay();
});

function updateMonthDisplay() {
  const monthText = document.querySelector('.font-dotgothic16 + .font-dotgothic16');
  if (monthText) {
    monthText.textContent = `2024年 ${currentMonth}月号`;
  }
}