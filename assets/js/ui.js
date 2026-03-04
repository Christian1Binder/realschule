import { initFlashcards } from './flashcards.js';
import { initQuiz } from './quiz.js';

export function renderSubjectContent(data, container) {
    if (!data.topics || data.topics.length === 0) {
        container.innerHTML = '<p class="text-center mt-4">Inhalte in Vorbereitung!</p>';
        return;
    }

    const topicsHTML = data.topics.map(topic => createTopicElement(topic)).join('');
    container.innerHTML = `<div class="topic-list">${topicsHTML}</div>`;

    // Attach Event Listeners for Accordion
    const headers = container.querySelectorAll('.topic-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all
            container.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));

            // Toggle clicked
            if (!isActive) item.classList.add('active');
        });
    });

    // Attach Event Listeners for Tabs
    const tabBtns = container.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent accordion toggle when clicking tabs
            e.stopPropagation();

            const targetId = btn.dataset.target;
            const topicContent = btn.closest('.topic-content');

            // Update buttons
            topicContent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update panes
            topicContent.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            topicContent.querySelector(`#${targetId}`).classList.add('active');
        });
    });

    // Initialize Components per topic
    data.topics.forEach(topic => {
        if (topic.flashcards && topic.flashcards.length > 0) {
            initFlashcards(`fc-${topic.id}`, topic.flashcards);
        }
        if (topic.quiz && topic.quiz.length > 0) {
            initQuiz(`qz-${topic.id}`, topic.quiz);
        }
    });
}

function createTopicElement(topic) {
    const summaryHTML = topic.summary.map(s => `<li>${s}</li>`).join('');

    return `
        <div class="topic-item" id="topic-${topic.id}">
            <div class="topic-header">
                <h3 class="topic-title">${topic.title}</h3>
                <span style="font-size: 1.5rem; color: var(--color-text-light);">⬇️</span>
            </div>
            <div class="topic-content">
                <div class="content-tabs">
                    <button class="tab-btn active" data-target="summary-${topic.id}">Zusammenfassung</button>
                    ${topic.flashcards && topic.flashcards.length ? `<button class="tab-btn" data-target="flashcards-${topic.id}">Lernkarten</button>` : ''}
                    ${topic.quiz && topic.quiz.length ? `<button class="tab-btn" data-target="quiz-${topic.id}">Quiz</button>` : ''}
                </div>

                <div id="summary-${topic.id}" class="tab-pane active summary-content">
                    <ul>${summaryHTML}</ul>
                </div>

                ${topic.flashcards && topic.flashcards.length ? `
                <div id="flashcards-${topic.id}" class="tab-pane">
                    <div class="flashcard-container" id="fc-${topic.id}"></div>
                </div>` : ''}

                ${topic.quiz && topic.quiz.length ? `
                <div id="quiz-${topic.id}" class="tab-pane">
                    <div class="quiz-container" id="qz-${topic.id}"></div>
                </div>` : ''}
            </div>
        </div>
    `;
}

export function setupSearch(data, container) {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        container.querySelectorAll('.topic-item').forEach(item => {
            const title = item.querySelector('.topic-title').textContent.toLowerCase();
            const summary = item.querySelector('.summary-content').textContent.toLowerCase();

            if (title.includes(term) || summary.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}