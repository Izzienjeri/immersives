$(document).ready(function () {
  let rotation = 0;
  const $photo = $("#photo");
  let timeoutId;
  let originalImage;
  const $saveBtn = $("#saveBtn");

  $saveBtn.hide();

  $("#imageUpload").change(function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $photo.attr("src", e.target.result);
        originalImage = e.target.result;
        resetSettings();
        $saveBtn.show();
      };
      reader.readAsDataURL(file);
    } else {
      $saveBtn.hide();
    }
  });

  function resetSettings() {
    rotation = 0;
    $("#zoomSlider").val(1);
    $("#brightnessSlider").val(1);
    $("#contrastSlider").val(1);
    applyTransformAndFilters();
  }

  function applyTransformAndFilters() {
    const zoom = $("#zoomSlider").val();
    const brightness = $("#brightnessSlider").val();
    const contrast = $("#contrastSlider").val();
    $photo.css({
      transform: `rotate(${rotation}deg) scale(${zoom})`,
      filter: `brightness(${brightness}) contrast(${contrast})`,
    });
  }

  $("#rotateBtn").click(function () {
    rotation = (rotation + 90) % 360;
    applyTransformAndFilters();
  });

  function handleSliderChange() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      applyTransformAndFilters();
    }, 100);
  }

  $("#zoomSlider").on("input", handleSliderChange);
  $("#brightnessSlider").on("input", handleSliderChange);
  $("#contrastSlider").on("input", handleSliderChange);

  $("#saveBtn").click(function () {
    const canvas = document.createElement("canvas");
    const img = document.getElementById("photo");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.filter = getComputedStyle(img).filter;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale($("#zoomSlider").val(), $("#zoomSlider").val());
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    const img_org = new Image();
    img_org.onload = function () {
      ctx.drawImage(img_org, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      downloadImage(dataURL, "edited_image.png");
      showNotification("Image saved successfully!");
    };
    img_org.src = originalImage;
  });

  function downloadImage(dataURL, filename) {
    try {
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving image:", error);
      showNotification("Failed to save the image.");
    }
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.id = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 400);
    }, 2000);
  }
});
