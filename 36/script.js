const scores = {};
function calculateTotal(creativity, technique, presentation) {
    return creativity + technique + presentation;
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboardBody');
    leaderboard.innerHTML = '';
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b.total - a.total);
    sortedScores.forEach(([id, { creativity, technique, presentation, total }]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${id}</td>
                         <td>${creativity}</td>
                         <td>${technique}</td>
                         <td>${presentation}</td>
                         <td>${total}</td>`;
        leaderboard.appendChild(row);
    });
}

function addScore(e) {
    e.preventDefault();
    const dancerId = document.getElementById('dancerId').value.trim();
    const creativity = parseInt(document.getElementById('creativity').value, 10);
    const technique = parseInt(document.getElementById('technique').value, 10);
    const presentation = parseInt(document.getElementById('presentation').value, 10);
    if (!dancerId || isNaN(creativity) || isNaN(technique) || isNaN(presentation)) {
        alert('Make sure to fill all the fields correctly.')
        return;
    }
    if (scores[dancerId]) {
        scores[dancerId].creativity += creativity;
        scores[dancerId].technique += technique;
        scores[dancerId].presentation += presentation;
        scores[dancerId].total += calculateTotal(creativity, technique, presentation);
    } 
    else {
        scores[dancerId] = { creativity: creativity, technique: technique, presentation: presentation, total: calculateTotal(creativity, technique, presentation) };
    }
    document.getElementById('scoreForm').reset();
    updateLeaderboard();
}

document.getElementById('scoreForm').addEventListener('submit', addScore);