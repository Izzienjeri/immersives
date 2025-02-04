document.getElementById("format-button").addEventListener("click", function () {
  let inputJson = document.getElementById("input-json").value.trim();
  const outputContainer = document.getElementById("output-container");
  const outputJson = document.getElementById("output-json");

  if (inputJson === "") {
    outputContainer.style.display = "none";
    return;
  }

  let formattedJson;

  try {
    let parsedJson = JSON.parse(inputJson);

    const trimStrings = (obj) => {
      if (typeof obj === "string") {
        return obj.trim();
      } else if (Array.isArray(obj)) {
        return obj.map(trimStrings);
      } else if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, trimStrings(value)])
        );
      }
      return obj;
    };

    parsedJson = trimStrings(parsedJson);
    formattedJson = JSON.stringify(parsedJson, null, 2);

    outputJson.textContent = formattedJson;
    outputJson.classList.remove("error");
    outputJson.style.color = "black";
  } catch (error) {
    formattedJson = "Invalid JSON: " + error.message;
    outputJson.textContent = formattedJson;
    outputJson.classList.add("error");
    outputJson.style.color = "red";
  }

  outputContainer.style.display = "block";
});
