const tips = [
  {
    title: "Understanding Stock Market Volatility",
    date: "2024-01-20",
    content:
      "Learn about the causes of stock market volatility and how to manage it. Key points: economic indicators, market psychology, and risk diversification.",
  },
  {
    title: "The Importance of Diversification in Your Portfolio",
    date: "2024-01-25",
    content:
      "Why diversification is crucial for reducing risk. Cover different asset classes and the benefits of spreading your investments.",
  },
  {
    title: "How to Read Financial Statements: A Beginner's Guide",
    date: "2024-02-01",
    content:
      "Learn to interpret balance sheets, income statements, and cash flow statements. Essential for making informed investment decisions.",
  },
  {
    title: "Introduction to Fundamental Analysis",
    date: "2024-02-02",
    content:
      "A basic overview of fundamental analysis for evaluating a company's value. Explore key ratios and factors.",
  },
  {
    title: "The Role of Interest Rates in the Economy",
    date: "2024-02-05",
    content:
      "Discuss how changes in interest rates affect borrowing, spending, and the overall stock market.",
  },
  {
    title: "Beginner's Guide to Trading Options",
    date: "2024-02-08",
    content:
      "A beginner's introduction to call and put options, including the basics of buying and selling. Understand the risks involved",
  },
];

const blogContainer = document.getElementById("blog-container");

const renderTips = (tips) => {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;
  blogContainer.innerHTML = "";

  tips.forEach((tip) => {
    const tipBox = document.createElement("div");
    tipBox.classList.add("tip-box");

    const titleElement = document.createElement("h3");
    titleElement.textContent = tip.title;
    titleElement.classList.add("tip-title");

    const dateElement = document.createElement("p");
    dateElement.textContent = `${new Date(tip.date).toLocaleDateString()}`;
    dateElement.classList.add("tip-date");

    const contentElement = document.createElement("p");
    contentElement.textContent = tip.content;
    contentElement.classList.add("tip-content");

    tipBox.appendChild(titleElement);
    tipBox.appendChild(dateElement);
    tipBox.appendChild(contentElement);

    blogContainer.appendChild(tipBox);
  });
};

renderTips(tips);

const addTipForm = document.getElementById("add-tip-form");
if (addTipForm) {
  addTipForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const content = document.getElementById("content").value;

    tips.push({ title, date, content });
    renderTips(tips);
    addTipForm.reset();

    console.log(tips);
    console.log(blogContainer.innerHTML);
  });
}
