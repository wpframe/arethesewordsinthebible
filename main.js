let wordDatabase = {};

fetch('words.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch words.json");
        }
        return response.json();
    })
    .then(data => {
        wordDatabase = data;
    })
    .catch(error => {
        console.error("Error:", error);
    });

function countWords() {
    const text = document.getElementById("textInput").value;
    const words = Array.from(new Set(text.toLowerCase().split(/\s+/).map(word => word.replace(/^[^\w]+|[^\w]+$/g, '')).filter(Boolean)));

    const sortedWords = sortByLeastOccurrence(words);
    displayWords(sortedWords);
}

function sortByLeastOccurrence(words) {
    return words.sort((a, b) => (wordDatabase[a] || 0) - (wordDatabase[b] || 0));
}

function displayWords(words) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    let foundInBibleCount = 0;

    for (let word of words) {
        const count = wordDatabase[word] || 0;
        if (count > 0) {
            foundInBibleCount++;
        }
        if (count === 0) {
            output.innerHTML += `<span style="color: red; font-weight: bold;">${word}: ${count} times</span><br>`;
        } else {
            output.innerHTML += `${word}: ${count} times<br>`;
        }
    }

    const percentage = (foundInBibleCount / words.length) * 100;
    output.innerHTML += `<br><strong>total percentage of words in the bible:</strong> ${percentage.toFixed(2)}%`;
}
