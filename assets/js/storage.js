export function saveProgress(topicId, score, total) {
    let progress = loadProgress();
    progress[topicId] = {
        score: score,
        total: total,
        completedAt: new Date().toISOString()
    };
    localStorage.setItem('ella-progress', JSON.stringify(progress));
}

export function loadProgress() {
    const saved = localStorage.getItem('ella-progress');
    return saved ? JSON.parse(saved) : {};
}