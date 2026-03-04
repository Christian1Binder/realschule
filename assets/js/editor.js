export function setupEditor(currentData) {
    const editorBtn = document.getElementById('open-editor-btn');
    const modal = document.getElementById('editor-modal');
    const closeBtn = document.getElementById('close-editor');
    const exportBtn = document.getElementById('export-json');
    const form = document.getElementById('editor-form');

    if (!editorBtn || !modal) return;

    editorBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    exportBtn.addEventListener('click', () => {
        const title = document.getElementById('topic-title').value;
        const summaryText = document.getElementById('topic-summary').value;

        if (!title || !summaryText) {
            alert('Bitte fülle mindestens Titel und Zusammenfassung aus.');
            return;
        }

        const summary = summaryText.split('\n').filter(line => line.trim() !== '');

        const fcQ = document.getElementById('fc-q')?.value;
        const fcA = document.getElementById('fc-a')?.value;
        const flashcards = [];
        if (fcQ && fcA) {
            flashcards.push({ q: fcQ, a: fcA });
        }

        const quizQ = document.getElementById('quiz-q')?.value;
        const quizC1 = document.getElementById('quiz-c1')?.value;
        const quizC2 = document.getElementById('quiz-c2')?.value;
        const quizC3 = document.getElementById('quiz-c3')?.value;
        const quizC4 = document.getElementById('quiz-c4')?.value;
        const quizAnswer = parseInt(document.getElementById('quiz-answer')?.value || "0");
        const quizExp = document.getElementById('quiz-exp')?.value;

        const quiz = [];
        if (quizQ && quizC1 && quizC2 && quizC3 && quizC4) {
            quiz.push({
                question: quizQ,
                choices: [quizC1, quizC2, quizC3, quizC4],
                answerIndex: quizAnswer,
                explanation: quizExp || ""
            });
        }

        const newTopic = {
            id: `topic-${Date.now()}`,
            title: title,
            summary: summary,
            flashcards: flashcards,
            quiz: quiz
        };

        const updatedData = { ...currentData };
        updatedData.topics = [...updatedData.topics, newTopic];

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(updatedData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", `${currentData.slug}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        modal.classList.remove('active');
        form.reset();
        alert('Erfolgreich exportiert! Lade die Datei nach /data/grade-7/ herunter, um sie zu ersetzen.');
    });
}