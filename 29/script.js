document.getElementById("spinButton").addEventListener("click", function () {
    this.disabled = true;
    let wheel = document.getElementById("wheel");
    wheel.style.transition = "";
    let degree = Math.floor(Math.random() * 720) + 1440;
    wheel.style.transform = `rotate(${degree}deg)`;
    wheel.style.transition = "transform 4s ease-out";
  
    setTimeout(() => {
      const segments = document.querySelectorAll(".wheel-segment");
      const selectedSegmentIndex = Math.floor((degree % 360) / 60) % 6;
      const selectedSegment = segments[selectedSegmentIndex];
  
      document.getElementById("selectedBreed").innerText =
        selectedSegment.getAttribute("data-breed");
      document.getElementById("selectedDescription").innerText =
        selectedSegment.getAttribute("data-description");
      document.getElementById("selectedImage").src =
        selectedSegment.getAttribute("data-img");
      document.getElementById("selectedCatInfo").style.display = "block";
  
      this.disabled = false;
      setTimeout(() => {
        wheel.style.transition = "none";
        wheel.style.transform = `rotate(0deg)`;
      }, 1000);
    }, 4000);
  });