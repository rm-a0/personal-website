// Get all project graph containers
const graphContainers = document.querySelectorAll('.project-graph-container');

// Loop through each graph container
graphContainers.forEach(container => {
    const graphLanguages = container.querySelector('.project-graph-languages').querySelectorAll('p');
    const graph = container.querySelector('.project-graph');

    // Define colors for languages (default colors from github)
    const languageColors = {
        "PHP": "#4F5D95",
        "Zig": "#EC915C",
        "C": "#666666",
        "C++": "#F34B7D",
        "C#": "#178600",
        "Makefile": "#427819",
        "Python": "#3572A5",
        "HTML": "#E34C26",
        "CSS": "#563D7C",
        "Javascript": "#F1E05A",
        "Shell": "#89E051"
    };

    // Parse language data and calculate percentages
    let totalPercentage = 0;
    const languages = [];
    graphLanguages.forEach(language => {
        const [lang, percentageStr] = language.textContent.split(': ');
        const percentage = parseFloat(percentageStr.replace(',', '.'));
        totalPercentage += percentage;
        languages.push({ lang, percentage });

        // Get the color for this language from the languageColors object
        const color = languageColors[lang];
        const dotElement = language.previousElementSibling;
        dotElement.style.backgroundColor = color;
    });

    // Create segments for each language
    let offset = 0;
    languages.forEach(language => {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        segment.style.width = `${(language.percentage / totalPercentage) * 100}%`;
        segment.style.backgroundColor = languageColors[language.lang];
        graph.appendChild(segment);
    });
});
