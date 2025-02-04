const sauceList = document.getElementById('sauce-list');
const newSauceForm = document.getElementById('new-sauce-form');

let sauces = [
    { name: "Inferno Blast", ratings: [9, 8], tags: ["fruity", "spicy", "habanero"] },
    { name: "Atomic Fire", ratings: [7, 6], tags: ["smoky", "ghost pepper"] }
];

function calculateAverageRating(ratings) {
    if (ratings.length === 0) return "No ratings yet";
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
}

function renderSauces() {
    sauceList.innerHTML = '';

    sauces.forEach((sauce, index) => {
        const sauceCard = document.createElement('div');
        sauceCard.classList.add('sauce-card');

        sauceCard.innerHTML = `
            <h2>${sauce.name}</h2>
            <p class="heat-rating">Average Heat Rating: ${calculateAverageRating(sauce.ratings)}</p>
            <div class="tags-container">
                ${sauce.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button onclick="addRating('${sauce.name}')">Rate This Sauce</button>
            <button onclick="editSauce(${index})">Edit</button>
            <button onclick="deleteSauce(${index})">Delete</button>
        `;

        sauceList.appendChild(sauceCard);
    });
}

newSauceForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('sauce-name').value.trim();
    const rating = parseInt(document.getElementById('sauce-rating').value);
    const tagsInput = document.getElementById('tags').value.trim();
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

    if (!name || isNaN(rating) || tags.length === 0) {
        alert("Fill out all fields correctly.");
        return;
    }

    const newSauce = { name, ratings: [rating], tags };
    sauces.push(newSauce);
    renderSauces();
    newSauceForm.reset();
});

function addRating(sauceName) {
    const rating = prompt("Enter your rating for " + sauceName + " (1-10):");
    if (rating >= 1 && rating <= 10) {
        const sauce = sauces.find(s => s.name === sauceName);
        sauce.ratings.push(parseInt(rating));
        renderSauces();
    } else {
        alert("Invalid rating. Enter a number between 1 and 10.");
    }
}

function editSauce(index) {
    const sauce = sauces[index];

    const newName = prompt("Edit sauce name:", sauce.name);
    if (newName) sauce.name = newName;

    const newTags = prompt("Edit tags (comma-separated):", sauce.tags.join(', '));
    if (newTags) sauce.tags = newTags.split(',').map(tag => tag.trim());

    const newRating = prompt("Add an initial heat rating (1-10):");
    if (newRating && newRating >= 1 && newRating <= 10) {
        sauce.ratings = [parseInt(newRating)];
    }

    renderSauces();
}

function deleteSauce(index) {
    const confirmed = confirm(`Are you sure you want to delete "${sauces[index].name}"?`);
    if (confirmed) {
        sauces.splice(index, 1);
        renderSauces();
    }
}

renderSauces();