document.addEventListener('DOMContentLoaded', () => {
    // Slideshow configuration
    const slideshowConfig = {
        images: [
            '/image/hp-main-visual/mainV34 (compressed).jpg',
            '/image/hp-main-visual/DSC03428.JPG',
            '/image/hp-main-visual/100_0352.JPG',
            '/image/hp-main-visual/DSC03440.JPG',
            '/image/hp-main-visual/pop-067.JPG',
        ],
        autoplayDuration: 5000,
        isPlaying: true
    };

    // Preload images
    const preloadedImages = slideshowConfig.images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    // State management
    let currentSlide = 0;
    let autoplayInterval;

    // Get DOM elements
    const slideImage = document.querySelector('.hero-image');
    const statusContainers = document.querySelectorAll('[aria-label="Status Indicators"] > div');
    const prevButton = document.querySelector('[aria-label="Previous Slide"]');
    const nextButton = document.querySelector('[aria-label="Next Slide"]');
    const playPauseButton = document.querySelector('[aria-label="Play/Pause Slideshow"]');

    // Update slide and status immediately
    const updateSlide = (index) => {
        // Update image using preloaded image source
        slideImage.src = preloadedImages[index].src;
        
        // Update status indicators
        statusContainers.forEach((container, i) => {
            const visibleSVG = container.querySelector('svg:nth-child(1)');
            const hiddenSVG = container.querySelector('svg:nth-child(2)');
            
            if (i === index) {
                visibleSVG.classList.remove('hidden');
                hiddenSVG.classList.add('hidden');
            } else {
                visibleSVG.classList.add('hidden');
                hiddenSVG.classList.remove('hidden');
            }
        });
    };

    // Navigation functions - Direct updates
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slideshowConfig.images.length;
        updateSlide(currentSlide);
    };

    const previousSlide = () => {
        currentSlide = (currentSlide - 1 + slideshowConfig.images.length) % slideshowConfig.images.length;
        updateSlide(currentSlide);
    };

    // Autoplay controls - Updated for reliability
    const startAutoplay = () => {
        stopAutoplay(); // Clear any existing interval first
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, slideshowConfig.autoplayDuration);
        slideshowConfig.isPlaying = true;
        playPauseButton.setAttribute('aria-label', 'Pause Slideshow');
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        slideshowConfig.isPlaying = false;
        playPauseButton.setAttribute('aria-label', 'Play Slideshow');
    };

    const toggleAutoplay = () => {
        if (slideshowConfig.isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    };

    // Event listeners - Updated to restart autoplay timer on manual navigation
    prevButton.addEventListener('click', () => {
        stopAutoplay();
        previousSlide();
        if (slideshowConfig.isPlaying) {
            startAutoplay(); // Restart autoplay if it was playing
        }
    });

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        if (slideshowConfig.isPlaying) {
            startAutoplay(); // Restart autoplay if it was playing
        }
    });

    playPauseButton.addEventListener('click', toggleAutoplay);

    // Initialize slideshow
    updateSlide(currentSlide);
    startAutoplay(); // Start autoplay immediately

    // Touch support with immediate response
    let touchStartX = 0;
    let touchEndX = 0;

    slideImage.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slideImage.addEventListener('touchend', e => {
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
}); 