document.addEventListener("DOMContentLoaded", () => {
  const programDetailButtons = document.querySelectorAll(
    ".program-details-button"
  );

  programDetailButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const programCard = e.target.closest(".program");
      const programTitle = programCard.querySelector("h3").textContent;
      const programDetails = getProgramDetails(programTitle);
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${programTitle}</h2>
                    <p>${programDetails}</p>
                </div>
            `;
      document.body.appendChild(modal);

      const closeModal = modal.querySelector(".close");
      closeModal.addEventListener("click", () => {
        modal.remove();
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.remove();
      });
    });
  });

  const enrollButton = document.getElementById("enroll-now");
  if (enrollButton) {
    enrollButton.addEventListener("click", () => {
      window.location.href = "contact.html";
    });
  }

  function getProgramDetails(title) {
    const details = {
      "Football Excellence":
        "Our football Excellence program offers dedicated training sessions focusing on skills.",
      "Volleyball Mastery":
        "Elevate your volleyball skills with our intensive program.",
      "Basketball Elite":
        "Join our Basketball Elite program to develop your skills.",
      "Track & Field":
        "Our Track & Field Program focuses on speed and agility.",
      "Swimming Pro": "Improve your swimmming skills with our academy.",
      "Tennis Academy":
        "Our Tennis Academy offers individualized coaching to perfect your skills.",
    };
    return (
      details[title] ||
      "Program details are coming soon. Please contact us for more information."
    );
  }
});
