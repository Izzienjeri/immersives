const imageUpload = document.getElementById("imageUpload");
const rotateLeftButton = document.getElementById("rotateLeftButton");
const rotateRightButton = document.getElementById("rotateRightButton");
const resetButton = document.getElementById("resetButton");
const zoomSlider = document.getElementById("zoomSlider");
const brightnessSlider = document.getElementById("brightnessSlider");
const contrastSlider = document.getElementById("contrastSlider");
const image = document.getElementById("image");

let currentAngle = 0;

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) return;

  resetEditor();

  const reader = new FileReader();
  reader.onload = (e) => {
    image.src = e.target.result;
    image.style.display = "block";
    enableControls();
  };
  reader.readAsDataURL(file);
});

rotateLeftButton.addEventListener("click", () => {
  currentAngle -= 90;
  updateImageTransform();
});

rotateRightButton.addEventListener("click", () => {
  currentAngle += 90;
  updateImageTransform();
});

zoomSlider.addEventListener("input", () => {
  updateImageTransform();
});

brightnessSlider.addEventListener("input", () => {
  updateImageFilters();
});

contrastSlider.addEventListener("input", () => {
  updateImageFilters();
});

resetButton.addEventListener("click", () => {
  imageUpload.value = "";
  resetEditor();
});

function updateImageTransform() {
  const zoomValue = zoomSlider.value / 100;
  image.style.transform = `scale(${zoomValue}) rotate(${currentAngle}deg)`;
}

function updateImageFilters() {
  const brightnessValue = brightnessSlider.value / 100;
  const contrastValue = contrastSlider.value / 100;
  image.style.filter = `brightness(${brightnessValue}) contrast(${contrastValue})`;
}

function resetEditor() {
  currentAngle = 0;
  zoomSlider.value = 100;
  brightnessSlider.value = 100;
  contrastSlider.value = 100;
  image.style.transform = "";
  image.style.filter = "";
  image.style.display = "none";
  disableControls();
}

function enableControls() {
  rotateLeftButton.disabled = false;
  rotateRightButton.disabled = false;
  zoomSlider.disabled = false;
  brightnessSlider.disabled = false;
  contrastSlider.disabled = false;
  resetButton.disabled = false;
}

function disableControls() {
  rotateLeftButton.disabled = true;
  rotateRightButton.disabled = true;
  zoomSlider.disabled = true;
  brightnessSlider.disabled = true;
  contrastSlider.disabled = true;
  resetButton.disabled = true;
}
