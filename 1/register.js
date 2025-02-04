document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const newsletter = document.getElementById("newsletter").checked;
    const password = document.getElementById("password").value;

    alert(
      `Welcome, ${name}. ${
        newsletter
          ? "You are now subscribed to the newsletter."
          : "You are not subscribed to the newsletter."
      }`
    );

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("newsletter").checked = false;
    document.getElementById("password").value = "";
  });
