document.addEventListener("DOMContentLoaded", function () {
  const passwordLengthInput = document.getElementById("passwordLength");
  const includeCapsCheckbox = document.getElementById("includeCaps");
  const includeSpecialCharsCheckbox = document.getElementById(
    "includeSpecialChars"
  );
  const includeNumbersCheckbox = document.getElementById("includeNumbers");
  const generateRefreshBtn = document.getElementById("generateBtn");
  const resetBtn = document.createElement("button");
  const generatedPasswordDisplay = document.getElementById("generatedPassword");

  resetBtn.textContent = "Reset";
  resetBtn.id = "resetBtn";
  resetBtn.style.marginLeft = "10px";
  generateRefreshBtn.insertAdjacentElement("afterend", resetBtn);

  generateRefreshBtn.addEventListener("click", function () {
    if (generateRefreshBtn.textContent === "Generate Password") {
      generatePassword();
      generateRefreshBtn.textContent = "Refresh Password";
    } else {
      generatePassword();
    }
  });

  resetBtn.addEventListener("click", resetInputs);

  function generatePassword() {
    const length = parseInt(passwordLengthInput.value);

    if (!length || length < 6) {
      generatedPasswordDisplay.textContent =
        "Error: Password length must be at least 6.";
      generatedPasswordDisplay.style.color = "red";
      return;
    }

    const includeCaps = includeCapsCheckbox.checked;
    const includeSpecialChars = includeSpecialCharsCheckbox.checked;
    const includeNumbers = includeNumbersCheckbox.checked;

    const password = generateSecurePassword(
      length,
      includeCaps,
      includeSpecialChars,
      includeNumbers
    );
    generatedPasswordDisplay.textContent = password;
    generatedPasswordDisplay.style.color = "#28a745";
  }

  function resetInputs() {
    passwordLengthInput.value = "";
    includeCapsCheckbox.checked = false;
    includeSpecialCharsCheckbox.checked = false;
    includeNumbersCheckbox.checked = false;
    generatedPasswordDisplay.textContent = "";
    generateRefreshBtn.textContent = "Generate Password";
  }

  function generateSecurePassword(
    length,
    includeCaps,
    includeSpecialChars,
    includeNumbers
  ) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_-+={}[]|;:<>,.?/~";
    const numberChars = "0123456789";

    let charPool = lowercaseChars;
    let guaranteedChars = "";

    if (includeCaps) {
      charPool += uppercaseChars;
      guaranteedChars += uppercaseChars.charAt(
        Math.floor(Math.random() * uppercaseChars.length)
      );
    }
    if (includeSpecialChars) {
      charPool += specialChars;
      guaranteedChars += specialChars.charAt(
        Math.floor(Math.random() * specialChars.length)
      );
    }
    if (includeNumbers) {
      charPool += numberChars;
      guaranteedChars += numberChars.charAt(
        Math.floor(Math.random() * numberChars.length)
      );
    }

    let remainingLength = length - guaranteedChars.length;
    let password = guaranteedChars;

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool.charAt(randomIndex);
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  }
});
