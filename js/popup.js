// Make functions globally accessible
window.openPopup = function(cardId) {
    const popupContainer = document.getElementById('popupContainer');
    const card = document.getElementById(cardId);
    
    popupContainer.classList.remove('hidden');
    popupContainer.classList.add('flex');
    card.classList.remove('hidden');

    // Prevent body scrolling when popup is open
    document.body.style.overflow = 'hidden';
}

window.closePopup = function() {
    const popupContainer = document.getElementById('popupContainer');
    const cards = popupContainer.querySelectorAll('[id$="Card"]');
    
    popupContainer.classList.add('hidden');
    popupContainer.classList.remove('flex');
    cards.forEach(card => card.classList.add('hidden'));

    // Restore body scrolling when popup is closed
    document.body.style.overflow = '';
}

// Add click event listeners to stone containers
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stone-container').forEach((container, index) => {
        container.addEventListener('click', () => {
            const cardIds = ['gibeonCard', 'imillacCard', 'nantanCard', 'campoCard'];
            openPopup(cardIds[index]);
        });
    });

    // Close popup when clicking outside the card
    const popupContainer = document.getElementById('popupContainer');
    if (popupContainer) {
        popupContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });
    }

    // Add escape key listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});