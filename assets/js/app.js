import { loadSubjectData } from './content-loader.js';
import { renderSubjectContent, setupSearch } from './ui.js';
import { setupEditor } from './editor.js';

document.addEventListener('DOMContentLoaded', () => {
    // If we're on a subject page, load data
    const subjectContainer = document.getElementById('subject-content');
    if (subjectContainer) {
        const grade = subjectContainer.dataset.grade;
        const subjectSlug = subjectContainer.dataset.subject;

        loadSubjectData(grade, subjectSlug).then(data => {
            if (data) {
                // Set CSS Variables for Accent Color
                document.documentElement.style.setProperty('--accent-color', data.accent);

                // Update header
                const subjectTitle = document.getElementById('subject-title');
                if(subjectTitle) subjectTitle.textContent = data.subject;

                // Update breadcrumb
                const bcSubject = document.getElementById('bc-subject');
                if(bcSubject) bcSubject.textContent = data.subject;

                renderSubjectContent(data, subjectContainer);
                setupSearch(data, subjectContainer);
                setupEditor(data);
            } else {
                subjectContainer.innerHTML = '<p class="text-center mt-4">Inhalte werden bald hinzugefügt!</p>';
            }
        });
    }
});