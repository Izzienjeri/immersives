const sauces = [
  { name: "Sriracha", tags: ["spicy", "Asian"], ratings: [] },
  { name: "Tabasco", tags: ["vinegary", "classic"], ratings: [] },
  { name: "Frank RedHot", tags: ["mild", "buffalo"], ratings: [] },
];

function displaySauce(sauce) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <h3>${sauce.name}</h3>
      <p>Tags: <span id="tags-${sauce.name.replace(
        /\s+/g,
        ""
      )}">${sauce.tags.join(", ")}</span></p>
      <p>Average Heat Rating: <span id="avg-rating-${sauce.name.replace(
        /\s+/g,
        ""
      )}">Not rated yet</span></p>
      <label for="rating-${sauce.name.replace(/\s+/g, "")}">Rate:</label>
      <select id="rating-${sauce.name.replace(/\s+/g, "")}">
        <option value="">Select Rating</option>
        ${[...Array(10).keys()]
          .map((i) => `<option value="${i + 1}">${i + 1}</option>`)
          .join("")}
      </select>
      <button onclick="rateSauce('${sauce.name}')">Submit Heat Rating</button>
      <label for="add-tag-${sauce.name.replace(/\s+/g, "")}">Add Tag:</label>
      <input type="text" id="add-tag-${sauce.name.replace(/\s+/g, "")}">
      <button onclick="addTagToSauce('${sauce.name}')">Add Tag</button>
    `;
  sauceList.appendChild(listItem);
}

function rateSauce(sauceName) {
  const ratingValue = document.getElementById(
    `rating-${sauceName.replace(/\s+/g, "")}`
  ).value;
  const sauce = sauces.find((s) => s.name === sauceName);
  if (sauce && ratingValue) {
    sauce.ratings.push(parseInt(ratingValue));
    const averageRating =
      sauce.ratings.reduce((a, b) => a + b, 0) / sauce.ratings.length;
    document.getElementById(
      `avg-rating-${sauceName.replace(/\s+/g, "")}`
    ).innerText = averageRating.toFixed(1);
  }
  document.getElementById(`rating-${sauceName.replace(/\s+/g, "")}`).value = "";
}

function addTagToSauce(sauceName) {
  const newTag = document.getElementById(
    `add-tag-${sauceName.replace(/\s+/g, "")}`
  ).value;
  const sauce = sauces.find((s) => s.name === sauceName);
  if (sauce && newTag) {
    sauce.tags.push(newTag);
    document.getElementById(`tags-${sauceName.replace(/\s+/g, "")}`).innerText =
      sauce.tags.join(", ");
  }
  document.getElementById(`add-tag-${sauceName.replace(/\s+/g, "")}`).value =
    "";
}

sauces.forEach(displaySauce);
