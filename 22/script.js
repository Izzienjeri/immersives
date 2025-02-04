const sampleRecipes = [
  {
    name: "Pasta with Garlic and Oil",
    ingredients: ["pasta", "garlic", "olive oil", "salt", "pepper"],
    instructions:
      "1. Cook pasta. 2. Heat garlic in oil. 3. Toss pasta with garlic and oil. 4. Season with salt and pepper.",
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheese", "butter"],
    instructions:
      "1. Butter bread slices. 2. Add cheese between bread slices. 3. Grill on a skillet until golden brown and cheese is melted.",
  },
  {
    name: "Fruit Salad",
    ingredients: ["apple", "banana", "strawberries", "grapes", "honey"],
    instructions:
      "1. Chop fruits into pieces. 2. Mix in a bowl. 3. Drizzle with honey and serve chilled.",
  },
  {
    name: "Garlic Bread",
    ingredients: ["bread", "garlic", "butter", "parsley"],
    istructions:
      "1. Mix minced garlic with softened butter and chopped parsley. 2. Spread over bread slices. 3. Bake at 180ºC until golden.",
  },
];

const ingredientInput = document.getElementById("ingredient-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");
const modal = document.getElementById("recipeModal");
const closeModalButton = modal.querySelector(".close-modal");

searchButton.addEventListener("click", () => {
  const ingredients = ingredientInput.value
    .split(",")
    .map((item) => item.trim().toLowerCase());

  const matchingRecipes = sampleRecipes.filter((recipe) =>
    ingredients.some((ingredient) =>
      recipe.ingredients.some(
        (recipeIngredient) => recipeIngredient.toLowerCase() === ingredient
      )
    )
  );

  displayRecipes(matchingRecipes);
});

function displayRecipes(recipes) {
  resultsContainer.innerHTML = "";
  if (recipes.length === 0) {
    resultsContainer.textContent = "No recipes found.";
    return;
  }
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    resultsContainer.appendChild(card);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const title = document.createElement("h2");
  title.textContent = recipe.name;
  card.appendChild(title);

  const viewButton = document.createElement("button");
  viewButton.textContent = "View Recipe";
  viewButton.addEventListener("click", () => openModal(recipe));
  card.appendChild(viewButton);

  return card;
}

function openModal(recipe) {
  document.getElementById("recipe-name").textContent = recipe.name;

  const ingredientsList = document.getElementById("recipe-ingredients");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  document.getElementById("recipe-instructions").textContent =
    recipe.instructions;
  modal.style.display = "flex";
}

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});
