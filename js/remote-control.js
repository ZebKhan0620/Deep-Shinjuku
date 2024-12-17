document.addEventListener('DOMContentLoaded', () => {
  const remoteControl = document.getElementById('remoteControl');
  if (!remoteControl) return;

  // Get button elements
  const topButton = remoteControl.querySelector('.article-nav.top');
  const bottomButton = remoteControl.querySelector('.article-nav.bottom');
  const upButton = remoteControl.querySelector('.page-nav.up');
  const downButton = remoteControl.querySelector('.page-nav.down');

  // Verify all buttons exist
  if (!topButton || !bottomButton || !upButton || !downButton) {
    console.error('Some remote control buttons are missing');
    return;
  }

  // Handle page scroll for up/down buttons
  function handlePageScroll(direction) {
    const scrollAmount = window.innerHeight * 0.5; // 50vh scroll
    window.scrollBy({
      top: direction === 'up' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  // Add click event listeners (without optional chaining)
  upButton.addEventListener('click', () => handlePageScroll('up'));
  downButton.addEventListener('click', () => handlePageScroll('down'));
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  bottomButton.addEventListener('click', () => window.scrollTo({ 
    top: document.documentElement.scrollHeight, 
    behavior: 'smooth' 
  }));

  // Log to verify initialization
  console.log('Remote control initialized');
});