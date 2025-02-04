const imageUpload = document.getElementById("image-upload");
const canvas = document.getElementById("image-canvas");
const imageContainer = document.getElementById("image-container");

const context = canvas.getContext("2d");
const aspectRatioControls = document.getElementById("aspect-ratio-controls");

let originalImage = new Image();
let originalImageWidth = 0;
let originalImageHeight = 0;

imageUpload.addEventListener("change", (event) => {
  event.preventDefault();

  const imageFile = imageUpload.files[0];
  if (!imageFile) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    originalImage.src = e.target.result;
    triggerToast(`Image uploaded successfully`);
  };

  reader.readAsDataURL(imageFile);
});

originalImage.onload = () => {
  originalImageWidth = originalImage.width;
  originalImageHeight = originalImage.height;
  imageContainer.hidden = false;
  aspectRatioControls.hidden = false;

  canvas.width = originalImageWidth;
  canvas.height = originalImageHeight;
  context.drawImage(
    originalImage,
    0,
    0,
    originalImageWidth,
    originalImageHeight
  );
};

aspectRatioControls.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const [ratioWidth, ratioHeight] = event.target.dataset.ratio
      .split(":")
      .map(Number);

    const aspectRatio = ratioWidth / ratioHeight;
    let cropWidth = originalImageWidth;
    let cropHeight = originalImageHeight;

    if (originalImageWidth / originalImageHeight > aspectRatio) {
      cropWidth = originalImageHeight * aspectRatio;
    } else {
      cropHeight = originalImageWidth / aspectRatio;
    }

    const xOffset = (originalImageWidth - cropWidth) / 2;
    const yOffset = (originalImageHeight - cropHeight) / 2;

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    context.drawImage(
      originalImage,
      xOffset,
      yOffset,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    triggerToast(`Aspect ratio changed to ${ratioWidth}:${ratioHeight}`);
  }
});

function triggerToast(message) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBody = document.getElementById("messageText");
  toastBody.innerHTML = message;

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
