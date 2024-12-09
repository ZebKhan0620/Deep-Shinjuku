function openPopup(cardId) {
    const popupContainer = document.getElementById('popupContainer');
    const card = document.getElementById(cardId);
    
    popupContainer.classList.remove('hidden');
    popupContainer.classList.add('flex');
    card.classList.remove('hidden');
  }

  function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    const cards = popupContainer.querySelectorAll('[id$="Card"]');
    
    popupContainer.classList.add('hidden');
    popupContainer.classList.remove('flex');
    cards.forEach(card => card.classList.add('hidden'));
  }

  // Add click event listeners to stone containers
  document.querySelectorAll('.stone-container').forEach((container, index) => {
    container.addEventListener('click', () => {
      const cardIds = ['gibeonCard', 'imillacCard', 'nantanCard', 'campoCard'];
      openPopup(cardIds[index]);
    });
  });