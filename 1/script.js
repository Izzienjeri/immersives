const articles = [
  {
    title: "Risk Management 101: Safeguarding Your Investments",
    date: "2024-01-15",
    shortDescription:
      "A beginner's guide to understanding and mitigating the risks associated with trading.",
    htmlContent: `
            <h2>Risk Management 101</h2>
            <p>Paragraph 1: Introduction to risk management, its importance, and key concepts like stop-loss orders and diversification.</p>
            <p>Paragraph 2: Practical tips for assessing your risk tolerance and setting appropriate position sizes.</p>
            `,
    author: "Sarah Johnson",
    thumbnail: "https://placehold.co/400",
  },
  {
    title: "Decoding Technical Analysis: Chart Patterns and Indicators",
    date: "2024-01-18",
    shortDescription:
      "Learn to read the language of charts and use technical indicators to identify potential trading opportunities.",
    htmlContent: `
            <h2>Technical Analysis</h2>
            <p>Paragraph 1: Introduction to technical analysis, candlestick patterns, moving averages, and other indicators.</p>
            <p>Paragraph 2: Practical examples and case studies of how to apply technical analysis in trading decisions.</p>
            `,
    author: "Mark Williams",
    thumbnail: "https://placehold.co/400",
  },
  {
    title: "Global Market Insights: Trends and Projections for 2024",
    date: "2024-01-20",
    shortDescription:
      "A detailed look at current market trends and forecasts to help guide your investment strategy.",
    htmlContent: `
            <h2>Global Market Insights</h2>
            <p>Paragraph 1: Analysis of key market trends, including economic indicators and global events shaping the landscape in 2024.</p>
            <p>Paragraph 2: Practical advice on leveraging market trends to make informed investment decisions for the new year.</p>
            `,
    author: "Jane Doe",
    thumbnail: "https://placehold.co/400",
  },
  {
    title: "Day Trading Strategies for Beginners in 2024",
    date: "2024-01-22",
    shortDescription:
      "Learn essential strategies and tools for successful day trading in fast-paced markets, tailored for 2024.",
    htmlContent: `
            <h2>Day Trading Strategies for 2024</h2>
            <p>Paragraph 1: Overview of day trading, including common strategies like scalping and momentum trading, with current market examples.</p>
            <p>Paragraph 2: Key tools and techniques to manage risk and maximize returns in intraday trading in the current economic climate.</p>
            `,
    author: "Billy Joel",
    thumbnail: "https://placehold.co/400",
  },
];

const articleContainer = document.querySelector("#article-container");
const modal = document.getElementById("article-modal");
const modalContent = document.getElementById("modal-article-content");
const closeModalBtn = document.querySelector(".close-modal");

function displayArticles() {
  if (!articleContainer) return;

  articles.forEach((article) => {
    const dateOptions = { month: "short", day: "numeric" };

    const articleElement = document.createElement("div");
    articleElement.classList.add("article");
    articleElement.style.backgroundImage = `url(${article.thumbnail})`;
    articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p class="date">${new Date(article.date).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}</p>
            `;

    articleElement.addEventListener("click", () => {
      openModal(article);
    });

    articleContainer.appendChild(articleElement);
  });
}

function openModal(article) {
  if (!modal || !modalContent) return;
  modalContent.innerHTML = `
        <h2>${article.title}</h2>
        <p>Published by ${article.author}</p>
        ${article.htmlContent}
    `;
  modal.style.display = "block";
}

function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

window.onload = displayArticles;
