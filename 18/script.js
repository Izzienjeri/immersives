if (localStorage.getItem("books") === null) {
  fetch("books.json")
    .then((response) => response.json())
    .then((data) => localStorage.setItem("books", JSON.stringify(data)));
}
if (localStorage.getItem("reviews") === null) {
  fetch("reviews.json")
    .then((response) => response.json())
    .then((data) => localStorage.setItem("reviews", JSON.stringify(data)));
}
if (localStorage.getItem("authors") === null) {
  fetch("authors.json")
    .then((response) => response.json())
    .then((data) => localStorage.setItem("authors", JSON.stringify(data)));
}

const storedBooks = JSON.parse(localStorage.getItem("books"));

function createBookCard(book) {
  const link = document.createElement("a");
  link.classList.add("book-card");
  link.href = "book.html?id=" + book.id;

  const img = document.createElement("img");
  img.src = book.cover;
  img.alt = book.title;

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.textContent = "By " + book.author;

  const rating = document.createElement("p");
  rating.textContent = "Rating: " + book.rating;

  const category = document.createElement("p");
  category.textContent = "Category: " + book.category;

  const price = document.createElement("p");
  price.textContent = "Price: $" + book.price;

  link.appendChild(img);
  link.appendChild(title);
  link.appendChild(author);
  link.appendChild(rating);
  link.appendChild(category);
  link.appendChild(price);

  return link;
}

const bestsellersGrid = document.getElementById("bestseller-grid");
storedBooks
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 8)
  .forEach((book) => {
    bestsellersGrid.appendChild(createBookCard(book));
  });

const newReleasesGrid = document.getElementById("new-release-grid");
storedBooks
  .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
  .slice(0, 8)
  .forEach((book) => {
    newReleasesGrid.appendChild(createBookCard(book));
  });
