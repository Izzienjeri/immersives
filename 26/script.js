const bookData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    available: true,
    coverUrl: "https://example.com/cover1.jpg", // Replace with actual cover URL
  },
  {
    title: "Another Book",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273564",
    available: true,
    coverUrl: "https://example.com/cover2.jpg", // Replace with actual cover URL
  },
];

const bookList = document.getElementById("bookList");
const loanSection = document.getElementById("loanSection");
const bookSelect = document.getElementById("bookSelect");
const loanMessage = document.getElementById("loanMessage");
const memberIdInput = document.getElementById("memberId");

function displayBookList() {
  bookList.innerHTML = "";

  for (let book of bookData) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `  
        <h2>${book.title}</h2>  
        <p>By ${book.author}</p>  
        <img src="${book.coverUrl}" alt="${book.title} cover">  
        <br />
        <button onclick="showLoanForm('${book.isbn}')">Loan</button>  
        `;
    bookList.appendChild(bookCard);
  }
}

function showLoanForm(isbn) {
  loanSection.style.display = "block";
  bookSelect.innerHTML = "";

  for (let book of bookData) {
    if (book.isbn === isbn) {
      bookSelect.add(new Option(book.title, isbn));
    }
  }
}

const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || [];

function loanBook() {
  const memberId = document.getElementById("memberId").value;

  if (!memberId) {
    loanMessage.textContent = "Please enter a Member ID.";
    return;
  }

  const selectedISBN = bookSelect.value;

  const bookIndex = bookData.findIndex((book) => book.isbn === selectedISBN);

  if (bookIndex !== -1 && bookData[bookIndex].available) {
    bookData[bookIndex].available = false;
    const today = new Date().toISOString().split("T")[0];
    loanedBooks.push({
      memberId: memberId,
      bookIsbn: selectedISBN,
      bookTitle: bookData[bookIndex].title,
      loanDate: today,
    });

    localStorage.setItem("loanedBooks", JSON.stringify(loanedBooks));
    loanMessage.textContent = "Book loaned successfully!";
    displayLoanedBooks();
  } else {
    loanMessage.textContent = "Error: Book not found or unavailable.";
  }
}

function displayLoanedBooks() {
  const loanedList = document.getElementById("loanedList");
  loanedList.innerHTML = "";

  for (let loan of loanedBooks) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
        ${loan.bookTitle} (Member ID: ${loan.memberId})
        <button onclick="returnBook('${loan.bookIsbn}')">Return</button>
      `;
    loanedList.appendChild(listItem);
  }
}

function returnBook(isbn) {
  const bookIndex = loanedBooks.findIndex((loan) => loan.bookIsbn === isbn);

  if (bookIndex !== -1) {
    loanedBooks.splice(bookIndex, 1);

    const bookDataIndex = bookData.findIndex((book) => book.isbn === isbn);
    if (bookDataIndex !== -1) {
      bookData[bookDataIndex].available = true;
    }
    localStorage.setItem("loanedBooks", JSON.stringify(loanedBooks));

    displayLoanedBooks();

    memberIdInput.value = "";
    loanMessage.textContent = "";
    alert("Book returned successfully!");
  } else {
    loanMessage.textContent = "Error: Book not found in loaned list.";
  }
}

const savedMemberId = localStorage.getItem("memberId");
if (savedMemberId) {
  memberIdInput.value = savedMemberId;
}

displayBookList();
displayLoanedBooks();
