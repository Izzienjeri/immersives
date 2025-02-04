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

const urlParams = new URLSearchParams(window.location.search);
const authorId = parseInt(urlParams.get("id"), 10);

if (authorId) {
  const storedAuthors = JSON.parse(localStorage.getItem("authors"));
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  const author = storedAuthors.find((author) => author.id === authorId);
  if (author) {
    console.log(author);
    document.getElementById("author-name").textContent = author.name;
    document.getElementById("author-birthdate").textContent =
      author.dateOfBirth;
    document.getElementById("author-image").src = author.image;
    document.getElementById("author-image").alt = author.name;
    document.getElementById("author-bio").textContent = author.bio;

    const authorBooks = storedBooks.filter((book) =>
      author.books.includes(book.id)
    );
    const authorBooksContainer = document.getElementById("author-books-list");
    authorBooks.forEach((book) => {
      const bookElement = createBookCard(book);
      authorBooksContainer.appendChild(bookElement);
    });
  }
}

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

  link.appendChild(img);
  link.appendChild(title);
  link.appendChild(author);
  link.appendChild(rating);
  link.appendChild(category);

  return link;
}
