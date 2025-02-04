const recipes = [
	{
		name: "Vegan Pasta Primavera",
		ingredients: [
			"Pasta",
			"Assorted Vegetables",
			"Olive Oil",
			"Garlic",
			"Salt",
			"Pepper",
		],
		instructions:
			"Cook pasta. Sauté vegetables with garlic, oil, salt, and pepper. Combine with pasta.",
	},
	{
		name: "Vegan Chili",
		ingredients: [
			"Kidney beans",
			"Tomato sauce",
			"Onion",
			"Bell peppers",
			"Corn",
			"Chili powder",
			"Cumin",
			"Garlic",
		],
		instructions:
			"Sauté onions and garlic. Add peppers, beans, corn, tomato sauce, and spices. Simmer for 30 minutes.",
	},
	{
		name: "Quinoa Salad",
		ingredients: [
			"Quinoa",
			"Cucumber",
			"Cherry tomatoes",
			"Avocado",
			"Lemon juice",
			"Olive oil",
			"Salt",
			"Pepper",
		],
		instructions:
			"Cook quinoa. Mix with chopped vegetables. Dress with lemon juice, olive oil, salt, and pepper.",
	},
	{
		name: "Vegan Burrito",
		ingredients: [
			"Tortillas",
			"Black beans",
			"Rice",
			"Avocado",
			"Salsa",
			"Lettuce",
			"Lime juice",
		],
		instructions:
			"Fill tortillas with rice, beans, avocado, lettuce, and salsa. Drizzle with lime juice and wrap.",
	},
	{
		name: "Tofu Stir-Fry",
		ingredients: [
			"Tofu",
			"Broccoli",
			"Carrot",
			"Soy sauce",
			"Ginger",
			"Garlic",
			"Rice or noodles",
		],
		instructions:
			"Sauté tofu until golden. Add vegetables, garlic, and ginger. Serve over rice or noodles with soy sauce.",
	},
	{
		name: "Vegan Curry",
		ingredients: [
			"Coconut milk",
			"Chickpeas",
			"Spinach",
			"Curry powder",
			"Onion",
			"Garlic",
			"Rice",
		],
		instructions:
			"Cook onion and garlic. Add chickpeas, spinach, curry powder, and coconut milk. Serve with rice.",
	},
	{
		name: "Stuffed Bell Peppers",
		ingredients: [
			"Bell peppers",
			"Quinoa",
			"Black beans",
			"Corn",
			"Tomato sauce",
			"Cumin",
			"Avocado",
		],
		instructions:
			"Mix cooked quinoa, beans, corn, tomato sauce, and cumin. Stuff into peppers. Bake until tender.",
	},
	{
		name: "Vegan Pizza",
		ingredients: [
			"Pizza dough",
			"Tomato sauce",
			"Vegan cheese",
			"Mushrooms",
			"Bell peppers",
			"Olives",
			"Onion",
		],
		instructions:
			"Spread sauce on dough. Top with cheese, mushrooms, peppers, olives, and onion. Bake until crust is crispy.",
	},
	{
		name: "Sweet Potato Soup",
		ingredients: [
			"Sweet potato",
			"Onion",
			"Vegetable broth",
			"Coconut milk",
			"Ginger",
			"Garlic",
		],
		instructions:
			"Sauté onion, ginger, and garlic. Add chopped sweet potato and broth. Blend until smooth. Stir in coconut milk.",
	},
	{
		name: "Vegan Pancakes",
		ingredients: [
			"Flour",
			"Baking powder",
			"Almond milk",
			"Maple syrup",
			"Vanilla extract",
			"Oil",
		],
		instructions:
			"Mix flour and baking powder. Add almond milk, maple syrup, and vanilla. Cook pancakes on a hot griddle.",
	},
];

function displayRecipes() {
  const recipesSection = document.getElementById("recipes");
  recipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe";
    recipeDiv.innerHTML = `<h3>${recipe.name}</h3>  
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>  
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>`;
    recipesSection.appendChild(recipeDiv);
  });
}

function findRecipesByIngredients() {
  const ingredientForm = document.getElementById("ingredient-form");
  ingredientForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const ingredients = document.getElementById("ingredients").value.split(",");
    const filteredRecipes = recipes.filter((recipe) => {
      return ingredients.every((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    });

    displayFilteredRecipes(filteredRecipes);
  });
}

function displayFilteredRecipes(filteredRecipes) {
  const recipesSection = document.getElementById("recipes");
  recipesSection.innerHTML = ""; 

  filteredRecipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe";
    recipeDiv.innerHTML = `<h3>${recipe.name}</h3>  
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>  
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>`;
    recipesSection.appendChild(recipeDiv);
  });

  document.getElementById("recipes").style.display="block"
}

const generateButton = document.getElementById("generate-plan");
const mealPlanDiv = document.getElementById("meal-plan");

generateButton.addEventListener("click", () => {
  mealPlanDiv.innerHTML = "";

  const numMeals = Math.floor(Math.random() * 7) + 3;

  for (let i = 0; i < numMeals; i++) {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];

    const mealItem = document.createElement("div");
    mealItem.classList.add("meal-item");
    mealItem.innerHTML = `
      <h3>${randomRecipe.name}</h3>
      <p><strong>Ingredients:</strong> ${randomRecipe.ingredients.join(
        ", "
      )}</p>
      <p><strong>Instructions:</strong> ${randomRecipe.instructions}</p>
    `;
    mealPlanDiv.appendChild(mealItem);
  
  }
});

findRecipesByIngredients(); 

window.onload = displayRecipes; 