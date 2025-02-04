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
const bookId = parseInt(urlParams.get("id"), 10);

if (bookId) {
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  const storedReviews = JSON.parse(localStorage.getItem("reviews"));
  const storedAuthors = JSON.parse(localStorage.getItem("authors"));
  const book = storedBooks.find((book) => book.id === bookId);
  if (book) {
    const reviews = storedReviews.filter((review) => review.bookId === bookId);
    //console.log(reviews);
    document.getElementById("book-title").textContent = book.title;
    document.getElementById("book-cover").src = book.cover;
    document.getElementById("book-author").textContent = book.author;
    document.getElementById("book-author").href =
      "author.html?id=" +
      encodeURIComponent(
        storedAuthors.find((author) => author.name === book.author).id
      );
    document.getElementById("book-description").textContent = book.description;
    document.getElementById("book-category").textContent =
      "Category: " + book.category;
    document.getElementById("book-rating").textContent =
      "Rating: " + book.rating;
    document.getElementById("book-price").textContent = "Price: $" + book.price;
    let bookReviewContainer = document.getElementById("book-reviews-list");

    reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review-item");
      const reviewAuthor = document.createElement("p");
      reviewAuthor.classList.add("review-author");
      reviewAuthor.textContent = review.name;
      const reviewRating = document.createElement("p");
      reviewRating.classList.add("review-rating");
      reviewRating.textContent = "Rating: " + review.rating;
      const reviewText = document.createElement("p");
      reviewText.classList.add("review-text");
      reviewText.textContent = review.comment;
      reviewElement.appendChild(reviewAuthor);
      reviewElement.appendChild(reviewRating);
      reviewElement.appendChild(reviewText);
      bookReviewContainer.appendChild(reviewElement);
    });

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("submit");
      const name = document.getElementById("review-name").value;
      const rating = document.getElementById("review-rating").value;
      const comment = document.getElementById("review-content").value;
      const newReview = {
        bookId: book.id,
        name,
        rating,
        comment,
      };
      console.log(newReview);
      storedReviews.push(newReview);
      localStorage.setItem("reviews", JSON.stringify(storedReviews));
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review-item");
      const reviewAuthor = document.createElement("p");
      reviewAuthor.classList.add("review-author");
      reviewAuthor.textContent = newReview.name;
      const reviewRating = document.createElement("p");
      reviewRating.classList.add("review-rating");
      reviewRating.textContent = "Rating: " + newReview.rating;
      const reviewText = document.createElement("p");
      reviewText.classList.add("review-text");
      reviewText.textContent = newReview.comment;
      reviewElement.appendChild(reviewAuthor);
      reviewElement.appendChild(reviewRating);
      reviewElement.appendChild(reviewText);
      bookReviewContainer.appendChild(reviewElement);
      reviewForm.reset();
    });

    const addToCartButton = document.getElementById("add-to-cart");
    addToCartButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        cart = [];
      }
      cart.push(book);
      alert("Book added to cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  } else {
    document.body.innerHTML = "<h1>Book not found</h1>";
  }
}
