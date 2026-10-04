import { loadSubjectData } from './content-loader.js';
import { renderSubjectContent, setupSearch } from './ui.js';
import { setupEditor } from './editor.js';

const editorCss=document.createElement('link');editorCss.rel='stylesheet';editorCss.href=new URL('../css/editor.css',import.meta.url).href;document.head.appendChild(editorCss);

document.addEventListener('DOMContentLoaded', () => {
    const subjectContainer = document.getElementById('subject-content');
    if (subjectContainer) {
        const grade = subjectContainer.dataset.grade;
        const subjectSlug = subjectContainer.dataset.subject;
        loadSubjectData(grade, subjectSlug).then(data => {
            if (data) {
                document.documentElement.style.setProperty('--accent-color', data.accent);
                const subjectTitle = document.getElementById('subject-title'); if(subjectTitle) subjectTitle.textContent = data.subject;
                const bcSubject = document.getElementById('bc-subject'); if(bcSubject) bcSubject.textContent = data.subject;
                renderSubjectContent(data, subjectContainer); setupSearch(data, subjectContainer); setupEditor(data);
            } else subjectContainer.innerHTML = '<p class="text-center mt-4">Inhalte werden bald hinzugefügt!</p>';
        });
    }
});