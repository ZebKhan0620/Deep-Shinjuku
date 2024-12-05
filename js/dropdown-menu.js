const header = document.querySelector('header');
const menuButton = document.querySelector('[aria-label="Toggle Navigation Menu"]');
const menuOverlay = document.getElementById('menuOverlay');
const upArrow = document.querySelector('.arrow-up');
const downArrow = document.querySelector('.arrow-down');
let currentMonth = 1;

// Toggle menu
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  
  menuButton.setAttribute('aria-expanded', !isExpanded);
  
  if (!isExpanded) {
    menuOverlay.style.visibility = 'visible';
    menuOverlay.style.opacity = '1';
    document.body.style.overflow = 'hidden';
    
    menuButton.classList.add('bg-black');
    menuButton.querySelector('svg').classList.add('fill-white');
  } else {
    menuOverlay.style.opacity = '0';
    document.body.style.overflow = 'auto';
    
    menuButton.classList.remove('bg-black');
    menuButton.querySelector('svg').classList.remove('fill-white');
    
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