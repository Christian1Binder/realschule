import { saveProgress, loadProgress } from './storage.js';

export function initQuiz(containerId, quizData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentQuestionIndex = 0;
    let score = 0;

    function renderQuestion(index) {
        if (index >= quizData.length) {
            showResults();
            return;
        }

        const questionData = quizData[index];
        const optionsHTML = questionData.choices.map((choice, i) =>
            `<button class="quiz-option" data-index="${i}">${choice}</button>`
        ).join('');

        container.innerHTML = `
            <div class="quiz-question">${index + 1}. ${questionData.question}</div>
            <div class="quiz-options">${optionsHTML}</div>
            <div class="quiz-feedback" id="feedback-${containerId}"></div>
            <div class="quiz-actions">
                <button class="btn btn-primary" id="btn-next-${containerId}" style="display:none;">Weiter</button>
            </div>
            <p class="text-center mt-2" style="color: var(--color-text-light); font-size: 0.9rem;">
                Frage ${index + 1} von ${quizData.length}
            </p>
        `;

        const options = container.querySelectorAll('.quiz-option');
        const feedback = container.querySelector(`#feedback-${containerId}`);
        const btnNext = container.querySelector(`#btn-next-${containerId}`);
        let answered = false;

        options.forEach(option => {
            option.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const selectedIndex = parseInt(option.dataset.index);
                const isCorrect = selectedIndex === questionData.answerIndex;

                options.forEach(opt => {
                    opt.disabled = true;
                    if(parseInt(opt.dataset.index) === questionData.answerIndex) {
                        opt.classList.add('correct');
                    }
                });

                option.classList.add('selected');

                if (isCorrect) {
                    score++;
                    feedback.textContent = 'Richtig! 🎉 ' + (questionData.explanation || '');
                    feedback.className = 'quiz-feedback show success';
                } else {
                    option.classList.add('incorrect');
                    feedback.textContent = 'Leider falsch. 😔 ' + (questionData.explanation || '');
                    feedback.className = 'quiz-feedback show error';
                }

                btnNext.style.display = 'inline-block';
            });
        });

        btnNext.addEventListener('click', () => {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        });
    }

    function showResults() {
        const percentage = Math.round((score / quizData.length) * 100);

        // Save Progress
        const topicId = containerId.replace('qz-', '');
        saveProgress(topicId, score, quizData.length);

        container.innerHTML = `
            <div class="text-center">
                <h3>Quiz abgeschlossen!</h3>
                <p>Du hast ${score} von ${quizData.length} Fragen richtig beantwortet.</p>
                <div style="font-size: 2rem; font-weight: bold; color: ${percentage >= 80 ? 'var(--color-success)' : 'var(--color-primary)'}; margin: var(--spacing-md) 0;">
                    ${percentage}%
                </div>
                <button class="btn btn-primary mt-2" id="btn-restart-${containerId}">Quiz wiederholen</button>
            </div>
        `;

        const btnRestart = container.querySelector(`#btn-restart-${containerId}`);
        btnRestart.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            renderQuestion(0);
        });
    }

    renderQuestion(currentQuestionIndex);
}