const gameSelect = document.getElementById("gameSelect");
const gameInfo = document.getElementById("gameInfo");
const gameTitle = document.getElementById("gameTitle");
const gameOverview = document.getElementById("gameOverview");
const gameInstructions = document.getElementById("gameInstructions");
const favoriteButton = document.getElementById("favoriteButton");

const gameData = {
  pacman: {
    title: "Pac-Man",
    overview: "Eat dots, power pellets, and avoid the ghosts!",
    instructions: [
      "Up Arrow: Move Up",
      "Down Arrow: Move Down",
      "Left Arrow: Move Left",
      "Right Arrow: Move Right",
    ],
  },
  spaceinvaders: {
    title: "Space Invaders",
    overview: "Shoot the descending aliens before they reach the bottom!",
    instructions: [
      "Left Arrow: Move Base Left",
      "Right Arrow: Move Base Right",
      "Spacebar: Fire",
    ],
  },
  mario: {
    title: "Super Mario Bros.",
    overview:
      "Run and jump through the Mushroom Kingdom to rescue Princess Peach!",
    instructions: [
      "Left/Right Arrow: Move Left/Right",
      "A: Jump",
      "B: Run/Fireball (with Fire Flower)",
    ],
  },
  galaga: {
    title: "Galaga",
    overview: "Defend your ship from waves of attacking alien insects.",
    instructions: ["Left/Right Arrow: Move Ship Left/Right", "Spacebar: Fire"],
  },
  tetris: {
    title: "Tetris",
    overview:
      "Fit falling blocks together to form complete lines and clear them.",
    instructions: [
      "Up Arrow: Rotate Block",
      "Left/Right Arrow: Move Block",
      "Down Arrow: Soft Drop",
      "Spacebar: Hard Drop",
    ],
  },
  digdug: {
    title: "Dig Dug",
    overview:
      "Dig tunnels and use your pump to inflate and defeat underground enemies.",
    instructions: ["Arrow Keys: Move", "Spacebar: Use Pump"],
  },
  donkeykong: {
    title: "Donkey Kong",
    overview:
      "Climb the construction site, avoid barrels, and rescue the damsel from Donkey Kong!",
    instructions: ["Arrow Keys: Move", "Spacebar: Jump"],
  },
};

for (const game in gameData) {
  const option = document.createElement("option");
  option.value = game;
  option.textContent = gameData[game].title;
  gameSelect.appendChild(option);
}

gameSelect.addEventListener("change", () => {
  const selectedGame = gameSelect.value;
  loadFavorites();

  if (selectedGame) {
    const selectedGameData = gameData[selectedGame];
    gameTitle.textContent = selectedGameData.title;
    gameOverview.textContent = selectedGameData.overview;

    gameInstructions.innerHTML = "";
    selectedGameData.instructions.forEach((instruction) => {
      const li = document.createElement("li");
      li.textContent = instruction;
      gameInstructions.appendChild(li);
    });

    gameInfo.style.display = "block";
  } else {
    gameInfo.style.display = "none";
  }
});

favoriteButton.addEventListener("click", () => {
  const selectedGame = gameSelect.value;
  if (selectedGame) {
    let favorites = loadFavorites();

    if (favorites.includes(selectedGame)) {
      favorites = favorites.filter((game) => game !== selectedGame);
    } else {
      favorites.push(selectedGame);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
});

function loadFavorites() {
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    favorites = JSON.parse(favorites);
  } else {
    favorites = [];
  }

  if (favorites.includes(gameSelect.value)) {
    favoriteButton.textContent = "Unfavorite";
    favoriteButton.classList.add("favorited");
  } else {
    favoriteButton.textContent = "Mark as Favorite";
    favoriteButton.classList.remove("favorited");
  }

  return favorites;
}

loadFavorites();