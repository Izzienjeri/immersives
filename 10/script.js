function getGamesFromLocalStorage() {
  const gamesData = localStorage.getItem("games");
  return gamesData ? JSON.parse(gamesData) : [];
}

function saveGamesToLocalStorage(games) {
  localStorage.setItem("games", JSON.stringify(games));
}

let games = getGamesFromLocalStorage();
renderGameList(games);

function renderGameList(games) {
  const gameList = document.getElementById("game-list");
  gameList.innerHTML = "";

  games.forEach((game, index) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.dataset.gameId = index;

    const gameTitle = document.createElement("h3");
    gameTitle.innerHTML = game.title;
    gameCard.appendChild(gameTitle);

    const gameConsole = document.createElement("h5");
    gameConsole.innerHTML = game.console;
    gameCard.appendChild(gameConsole);

    const gameReleaseDate = document.createElement("p");
    gameReleaseDate.innerHTML = game.releaseDate;
    gameCard.appendChild(gameReleaseDate);

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("data-bs-toggle", "tooltip");
    progressBar.setAttribute(
      "data-bs-title",
      `Level ${game.currentLevel} / ${game.totalLevels}`
    );
    const progressPercent = (game.currentLevel / game.totalLevels) * 100;

    const progressBarFill = document.createElement("div");
    progressBarFill.classList.add("progress-bar-fill");
    progressBarFill.style.width = `${progressPercent}%`;

    progressBar.appendChild(progressBarFill);
    gameCard.appendChild(progressBar);
    const tooltip = new bootstrap.Tooltip(progressBar);

    const editButtons = document.createElement("div");
    editButtons.classList.add("edit-buttons");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditModal(index));
    editButtons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteGame(index));
    editButtons.appendChild(deleteButton);

    gameCard.appendChild(editButtons);

    gameList.appendChild(gameCard);
  });
}

const searchBar = document.getElementById("search-bar");
const consoleFilter = document.getElementById("console-filter");

searchBar.addEventListener("input", (event) => {
  event.preventDefault();

  let filteredGames =
    searchBar.value !== ""
      ? games.filter((game) =>
          game.title.toLowerCase().includes(searchBar.value.toLowerCase())
        )
      : games;

  renderGameList(filteredGames);
});

consoleFilter.addEventListener("change", (event) => {
  event.preventDefault();

  let filteredGames =
    consoleFilter.value !== ""
      ? games.filter((game) => game.console == consoleFilter.value)
      : games;

  renderGameList(filteredGames);
});

const gameRegistrationForm = document.getElementById("game-registration-form");

gameRegistrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const releaseDate = document.getElementById("release-date").value;
  const console = document.getElementById("console").value;
  const currentLevel = parseInt(document.getElementById("current-level").value);
  const totalLevels = parseInt(document.getElementById("total-levels").value);

  const newGame = {
    title: title,
    releaseDate: releaseDate,
    console: console,
    currentLevel: currentLevel,
    totalLevels: totalLevels,
  };

  games.push(newGame);

  saveGamesToLocalStorage(games);

  renderGameList(games);

  document.getElementById("title").value = "";
  document.getElementById("release-date").value = "";
  document.getElementById("console").value = "";
  document.getElementById("current-level").value = "";
  document.getElementById("total-levels").value = "";
});

const editModal = document.getElementById("edit-modal");
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", closeEditModal);

function openEditModal(index) {
  const game = games[index];
  document.getElementById("edit-game-id").value = index;
  document.getElementById("edit-title").value = game.title;
  document.getElementById("edit-release-date").value = game.releaseDate;
  document.getElementById("edit-console").value = game.console;
  document.getElementById("edit-current-level").value = game.currentLevel;
  document.getElementById("edit-total-levels").value = game.totalLevels;

  editModal.style.display = "block";
}

function closeEditModal() {
  editModal.style.display = "none";
}

const editGameForm = document.getElementById("edit-game-form");

editGameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const index = parseInt(document.getElementById("edit-game-id").value);
  const title = document.getElementById("edit-title").value;
  const releaseDate = document.getElementById("edit-release-date").value;
  const console = document.getElementById("edit-console").value;
  const currentLevel = parseInt(
    document.getElementById("edit-current-level").value
  );
  const totalLevels = parseInt(
    document.getElementById("edit-total-levels").value
  );

  games[index] = {
    title: title,
    releaseDate: releaseDate,
    console: console,
    currentLevel: currentLevel,
    totalLevels: totalLevels,
  };

  saveGamesToLocalStorage(games);
  renderGameList(games);
  closeEditModal();
});

function deleteGame(index) {
  if (confirm("Are you sure you want to delete this game?")) {
    games.splice(index, 1);
    saveGamesToLocalStorage(games);
    renderGameList(games);
  }
}

window.addEventListener("click", (event) => {
  if (event.target == editModal) {
    closeEditModal();
  }
});
