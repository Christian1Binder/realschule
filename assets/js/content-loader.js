export async function loadSubjectData(grade, subjectSlug) {
    try {
        const response = await fetch(`../../../data/grade-${grade}/${subjectSlug}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to load data:', error);
        return null; // Handle missing file gracefully
    }
}