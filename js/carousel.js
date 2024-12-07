document.addEventListener('DOMContentLoaded', () => {
  // Get carousel elements
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  const dots = document.querySelectorAll('[data-slide-dot]');

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Initialize carousel
  function initCarousel() {
    // Set initial states
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    updateDots();
  }

  // Update navigation dots
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('opacity-100', index === currentSlide);
      dot.classList.toggle('opacity-50', index !== currentSlide);
    });
  }

  // Move to specific slide
  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });

    currentSlide = index;
    updateDots();
  }

  // Event Listeners
  prevButton.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });

  nextButton.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Touch events for swipe
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left
        goToSlide(currentSlide + 1);
      } else {
        // Swipe right
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Initialize carousel on load
  initCarousel();
}); 