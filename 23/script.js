const symptomsInput = document.getElementById("symptoms");
const checkButton = document.getElementById("checkButton");
const resultsDiv = document.getElementById("results");
const diseaseList = document.getElementById("diseaseList");
const symptomList = document.getElementById("symptomList");
const refreshButton = document.getElementById("refreshButton");

let currentSymptoms = [];

checkButton.addEventListener("click", function () {
  const symptoms = symptomsInput.value
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (symptoms.length === 0) {
    alert("Please enter at least one symptom.");
    return;
  }

  symptomList.innerHTML = "";
  currentSymptoms = [];

  symptoms.forEach((symptom) => {
    if (!currentSymptoms.includes(symptom)) {
      currentSymptoms.push(symptom);
      addSymptomToList(symptom);
    }
  });

  const possibleDiseases = checkDiseases(currentSymptoms);

  diseaseList.innerHTML = "";

  if (possibleDiseases && possibleDiseases.length > 0) {
    resultsDiv.style.display = "block";

    possibleDiseases.forEach((disease) => {
      const listItem = document.createElement("li");
      listItem.textContent = disease;
      diseaseList.appendChild(listItem);
    });
  } else {
    resultsDiv.style.display = "block";
    diseaseList.innerHTML = "<li>No matching diseases found.</li>";
  }
});

refreshButton.addEventListener("click", function () {
  symptomsInput.value = "";
  symptomList.innerHTML = "";
  resultsDiv.style.display = "none";
  diseaseList.innerHTML = "";
});

function addSymptomToList(symptom) {
  const listItem = document.createElement("li");
  listItem.textContent = symptom;
  symptomList.appendChild(listItem);
}

function checkDiseases(symptoms) {
  const sampleDiseases = {
    headache: ["Flu", "Migraine", "Tension Headache"],
    fever: ["Flu", "Common Cold", "Strep Throat"],
    cough: ["Flu", "Common Cold", "Bronchitis"],
    fatigue: ["Anemia", "Chronic Fatigue Syndrome", "Hypothyroidism"],
    "chest pain": ["Heart Attack", "Angina", "Pneumonia"],
    "sore throat": ["Strep Throat", "Common Cold", "Tonsillitis"],
    "runny nose": ["Common Cold", "Allergies", "Sinusitis"],
    nausea: ["Food Poisoning", "Migraine", "Stomach Virus"],
  };

  let matchingDiseases = [];

  for (let symptom of symptoms) {
    symptom = symptom.toLowerCase();

    if (sampleDiseases[symptom]) {
      sampleDiseases[symptom].forEach((disease) => {
        if (!matchingDiseases.includes(disease)) {
          matchingDiseases.push(disease);
        }
      });
    }
  }

  return matchingDiseases;
}
