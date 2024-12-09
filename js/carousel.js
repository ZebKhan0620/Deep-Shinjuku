document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    const prevButton = carousel.querySelector('.prev-slide');
    const nextButton = carousel.querySelector('.next-slide');
    const dots = carousel.querySelectorAll('[data-slide-dot]');
    let currentSlide = 0;

    // Function to update slide visibility
    const updateSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
      });

      // Update active dot
      dots.forEach((dot, i) => {
        const visibleDot = dot.querySelector('img:nth-child(1)');
        const hiddenDot = dot.querySelector('img:nth-child(2)');
        
        if (i === index) {
          visibleDot.classList.remove('hidden');
          hiddenDot.classList.add('hidden');
        } else {
          visibleDot.classList.add('hidden');
          hiddenDot.classList.remove('hidden');
        }
      });
    };

    // Navigation functions
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide(currentSlide);
    };

    const previousSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlide(currentSlide);
    };

    // Event listeners
    prevButton.addEventListener('click', previousSlide);
    nextButton.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlide(currentSlide);
      });
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }
    };

    // Initialize first slide
    updateSlide(currentSlide);
  });
}); 