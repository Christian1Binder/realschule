export function initFlashcards(containerId, flashcards) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentIndex = 0;

    function renderCard(index) {
        const cardData = flashcards[index];
        container.innerHTML = `
            <div class="flashcard" tabindex="0">
                <div class="flashcard-front">
                    <p>${cardData.q}</p>
                </div>
                <div class="flashcard-back">
                    <p>${cardData.a}</p>
                </div>
            </div>
            <div class="flashcard-controls">
                <button id="btn-prev-${containerId}" ${index === 0 ? 'disabled' : ''}>Zurück</button>
                <span>${index + 1} / ${flashcards.length}</span>
                <button id="btn-next-${containerId}" ${index === flashcards.length - 1 ? 'disabled' : ''}>Weiter</button>
            </div>
        `;

        const card = container.querySelector('.flashcard');

        function toggleFlip() {
            card.classList.toggle('flipped');
        }

        card.addEventListener('click', toggleFlip);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });

        const btnPrev = container.querySelector(`#btn-prev-${containerId}`);
        const btnNext = container.querySelector(`#btn-next-${containerId}`);

        btnPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderCard(currentIndex);
            }
        });

        btnNext.addEventListener('click', () => {
            if (currentIndex < flashcards.length - 1) {
                currentIndex++;
                renderCard(currentIndex);
            }
        });
    }

    renderCard(currentIndex);
}