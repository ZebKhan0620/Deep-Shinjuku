const header = document.querySelector('header');
const menuButton = document.querySelector('[aria-label="Toggle Navigation Menu"]');
const menuOverlay = document.getElementById('menuOverlay');
const upArrow = document.querySelector('.arrow-up');
const downArrow = document.querySelector('.arrow-down');
let currentMonth = 1;

// Handle header position on scroll
window.addEventListener('scroll', () => {
  const headerOffset = header.offsetTop;
  if (window.scrollY >= headerOffset) {
    header.classList.add('fixed', 'top-0', 'w-full', 'z-50');
    menuOverlay.classList.add('top-0');
  } else {
    header.classList.remove('fixed', 'top-0', 'w-full', 'z-50');
    menuOverlay.classList.remove('top-0');
  }
});

// Toggle menu
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isExpanded);
  
  if (isExpanded) {
    menuOverlay.style.height = '0';
    setTimeout(() => {
      menuOverlay.classList.add('hidden');
    }, 300);
  } else {
    menuOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
      // Include header height in total dropdown height
      const totalHeight = 664 + header.offsetHeight;
      menuOverlay.style.height = `${totalHeight}px`;
    });
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