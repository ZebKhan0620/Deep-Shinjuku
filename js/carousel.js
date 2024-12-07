document.addEventListener('DOMContentLoaded', () => {
  // Get all carousels
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel, carouselIndex) => {
    // Get elements for this specific carousel
    const slidesContainer = carousel.querySelector('.slides-container');
    const slides = carousel.querySelectorAll('.slide');
    const prevButton = carousel.querySelector('.prev-slide');
    const nextButton = carousel.querySelector('.next-slide');
    const dots = carousel.querySelectorAll('[data-slide-dot]');

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

    if (slidesContainer) {
      slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
    }

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

    // Initialize this carousel
    initCarousel();
  });
}); 