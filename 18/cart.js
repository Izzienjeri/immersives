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

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(storedCart);

if (storedCart.length > 0) {
  const cartGrid = document.getElementById("cart-grid");
  storedCart.forEach((book) => {
    cartGrid.appendChild(createBookCard(book));
  });
  displayCartTotal(storedCart);
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

function displayCartTotal(cart) {
  const total = cart.reduce((sum, book) => sum + book.price, 0);
  const totalElement = document.getElementById("total").firstChild;
  totalElement.textContent = "Total: $" + total;
  document.getElementById("cart-total").appendChild(totalElement);
}
