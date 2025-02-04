const team1Select = document.getElementById("team1");
const team2Select = document.getElementById("team2");

const team1Name = document.querySelector(".team-1 .team-name");
const team1Flag = document.querySelector(".team-1 .flag");
const team2Name = document.querySelector(".team-2 .team-name");
const team2Flag = document.querySelector(".team-2 .flag");

team1Select.addEventListener("change", updateTeam1);
team2Select.addEventListener("change", updateTeam2);

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((countries) => {
    const team1Select = document.getElementById("team1");
    const team2Select = document.getElementById("team2");

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.cca2.toLowerCase();
      option.textContent = country.name.common;

      team1Select.appendChild(option.cloneNode(true));
      team2Select.appendChild(option);
    });
  })
  .catch((error) => console.error("Error fetching countries:", error));

function updateTeam1() {
  const selectedTeamCode = team1Select.value;

  if (selectedTeamCode) {
    fetch(`https://restcountries.com/v3.1/alpha/${selectedTeamCode}`)
      .then((response) => response.json())
      .then((country) => {
        team1Name.textContent = country[0].name.common;
        team1Flag.src = country[0].flags.png;
        team1Flag.classList.add("visible");
      })
      .catch((error) =>
        console.error("Error fetching country details:", error)
      );
  } else {
    team1Name.textContent = "Team 1";
    team1Flag.src = "";
    team1Flag.classList.remove("visible");
  }
}

function updateTeam2() {
  const selectedTeamCode = team2Select.value;

  if (selectedTeamCode) {
    fetch(`https://restcountries.com/v3.1/alpha/${selectedTeamCode}`)
      .then((response) => response.json())
      .then((country) => {
        team2Name.textContent = country[0].name.common;
        team2Flag.src = country[0].flags.png;
        team2Flag.classList.add("visible");
      })
      .catch((error) =>
        console.error("Error fetching country details:", error)
      );
  } else {
    team2Name.textContent = "Team 2";
    team2Flag.src = "";
    team2Flag.classList.remove("visible");
  }
}

document.querySelectorAll(".goal-add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const team = button.parentElement;
    const scoreElement = team.querySelector(".score");
    let score = parseInt(scoreElement.textContent);
    score++;
    scoreElement.textContent = score;
  });
});

document.querySelectorAll(".goal-remove-button").forEach((button) => {
  button.addEventListener("click", () => {
    const team = button.parentElement;
    const scoreElement = team.querySelector(".score");
    let score = parseInt(scoreElement.textContent);
    if (score > 0) {
      score--;
    }
    scoreElement.textContent = score;
  });
});

document.querySelector(".reset-button").addEventListener("click", () => {
  document.querySelectorAll(".score").forEach((score) => {
    score.textContent = 0;
    team1Name.textContent = "Team 1";
    team1Select.value = "";
    team1Flag.src = "";
    team1Flag.classList.remove("visible");
    team2Name.textContent = "Team 2";
    team2Select.value = "";
    team2Flag.src = "";
    team2Flag.classList.remove("visible");
  });
});
