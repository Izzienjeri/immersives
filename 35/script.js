function formatJSON() {
    let input = document.getElementById("jsonInput").value;
    try {
      let parsedJSON = JSON.parse(input);
      for (let key in parsedJSON) {
        if (typeof parsedJSON[key] === "string") {
          parsedJSON[key] = parsedJSON[key].trim();
        }
      }
      let formatted = JSON.stringify(parsedJSON, null, 2);
      document.getElementById("jsonOutput").value = formatted;
    } catch (error) {
      alert("Invalid JSON input! Please check your syntax.");
    }
  }