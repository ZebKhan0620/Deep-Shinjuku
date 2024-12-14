// Make functions globally accessible
window.openImagePopup = function(imageSrc, imageTitle) {
    const popupContainer = document.getElementById('imagePopupContainer');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const imageContainer = popupImage.parentElement;
    const headerContainer = document.querySelector('.flex.justify-between.items-end');
    
    // Set image source and title
    popupImage.src = imageSrc;
    popupTitle.textContent = imageTitle;
    
    // Handle special cases for specific images
    if (imageSrc.includes('underground_gallery_first_01.jpg')) {
        // Image 1 dimensions
        popupImage.style.width = '472px';
        popupImage.style.height = '469px';
        popupImage.style.objectFit = 'cover';
        
        // Center the image
        imageContainer.style.display = 'flex';
        imageContainer.style.justifyContent = 'center';
        imageContainer.style.alignItems = 'center';
        
        // Align header with image
        if (headerContainer) {
            headerContainer.style.width = '472px';
            headerContainer.style.margin = '0 auto';
        }
    } else if (imageSrc.includes('underground_gallery_first_08.jpg')) {
        // Image 8 dimensions
        popupImage.style.width = '284px';
        popupImage.style.height = '469px';
        popupImage.style.objectFit = 'cover';
        
        // Center the image
        imageContainer.style.display = 'flex';
        imageContainer.style.justifyContent = 'center';
        imageContainer.style.alignItems = 'center';
        
        // Align header with image
        if (headerContainer) {
            headerContainer.style.width = '284px';
            headerContainer.style.margin = '0 auto';
        }
    } else {
        // Reset styles for other images
        popupImage.style.width = '100%';
        popupImage.style.height = '100%';
        popupImage.style.objectFit = 'cover';
        
        imageContainer.style.display = '';
        imageContainer.style.justifyContent = '';
        imageContainer.style.alignItems = '';
        
        if (headerContainer) {
            headerContainer.style.width = '100%';
            headerContainer.style.margin = '';
            headerContainer.style.marginBottom = '0';
        }
    }
    
    // Show popup and prevent scrolling
    document.body.style.overflow = 'hidden';
    popupContainer.classList.remove('hidden');
    popupContainer.classList.add('flex');

    // Add escape key listener
    document.addEventListener('keydown', handleEscKey);
};

window.closeImagePopup = function() {
    const popupContainer = document.getElementById('imagePopupContainer');
    
    // Hide popup and restore scrolling
    document.body.style.overflow = '';
    popupContainer.classList.add('hidden');
    popupContainer.classList.remove('flex');

    // Remove escape key listener
    document.removeEventListener('keydown', handleEscKey);
};

// Handle escape key press
function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeImagePopup();
    }
}

// Initialize popup functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.getElementById('imagePopupContainer');
    
    if (popupContainer) {
        // Close popup when clicking outside the image
        popupContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                closeImagePopup();
            }
        });
    }
}); 