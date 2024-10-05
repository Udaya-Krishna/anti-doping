// script.js
const apiKey = "2979406a4b8f457fa4ffe7bef19a9f30"; // Replace with your News API key
const newsContainer = document.getElementById("news-container");

// Function to fetch doping-related news
async function fetchDopingNews() {
  const url = `https://newsapi.org/v2/everything?q=doping+AND+sports&language=en&from=2024-09-01&to=2024-09-20&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.articles.length > 0) {
      displayNewsArticles(data.articles);
    } else {
      newsContainer.innerHTML = "<p>No news articles found for the selected topic.</p>";
    }
  } catch (error) {
    newsContainer.innerHTML = "<p>Error fetching news. Please try again later.</p>";
    console.error("Error fetching news:", error);
  }
}

// Function to display news articles
function displayNewsArticles(articles) {
  newsContainer.innerHTML = ""; // Clear previous articles
  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("news-article");

    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    newsContainer.appendChild(articleElement);
  });
}

// Fetch the news on page load
fetchDopingNews();

// Fetch the news every 30 seconds to auto-update the articles
setInterval(fetchDopingNews, 1000); // 30000 ms = 30 seconds
