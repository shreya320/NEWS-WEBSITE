// APIs
const API_KEY = "bd3bd4468dc74853939839c472051a04";
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

// Array
var newsDataArr = [];

// Functions to fetch news
const fetchGeneralNews = async () => {
    await fetchNews(GENERAL_NEWS);
}

const fetchBusinessNews = async () => {
    await fetchNews(BUSINESS_NEWS);
}

const fetchSportsNews = async () => {
    await fetchNews(SPORTS_NEWS);
}

const fetchEntertainmentNews = async () => {
    await fetchNews(ENTERTAINMENT_NEWS);
}

const fetchTechnologyNews = async () => {
    await fetchNews(TECHNOLOGY_NEWS);
}

const fetchQueryNews = async (event) => {
    event.preventDefault(); // Prevent form from submitting
    if (!newsQuery.value) return;
    const searchUrl = `${SEARCH_NEWS}${encodeURIComponent(newsQuery.value)}&apiKey=${API_KEY}`;
    await fetchNews(searchUrl);
}

const fetchNews = async (url) => {
    const response = await fetch(url);
    newsDataArr = [];
    if (response.ok) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
    }
    displayNews();
}

// Function to display news
function displayNews() {
    newsdetails.innerHTML = "";
    if (newsDataArr.length == 0) {
        newsdetails.innerHTML = "<h5>No Data was Found</h5>";
        return;
    }

    var row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.justifyContent = 'space-between';

    newsDataArr.forEach((news, index) => {
        var col = document.createElement('div');
        col.style.flex = '1 1 calc(25% - 1rem)'; // Four items per row with space between
        col.style.margin = '0.5rem';
        col.style.display = 'flex';
        col.style.flexDirection = 'column';

        var card = document.createElement('div');
        card.style.border = '2px solid #ccc';
        card.style.backgroundColor = '#fff';
        card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        card.style.padding = '0.5rem';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.flex = '1'; 
        card.style.height = '100%'; 

        var image = document.createElement('img');
        image.style.height = '150px';
        image.style.width = '100%';
        image.style.objectFit = 'cover'; 
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');
        cardBody.style.display = 'flex';
        cardBody.style.flexDirection = 'column';
        cardBody.style.flex = '1'; 

        var newsHeading = document.createElement('h5');
        newsHeading.style.fontSize = '1rem'; 
        newsHeading.style.fontWeight = '700';
        newsHeading.style.marginBottom = '0.25rem'; 
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.style.color = '#0d6efd';
        dateHeading.style.fontSize = '0.875rem'; 
        dateHeading.style.marginBottom = '0.25rem'; 
        dateHeading.innerHTML = news.publishedAt.split("T")[0];

        var description = document.createElement('p');
        description.style.color = '#555555';
        description.style.flex = '1'; 
        description.style.fontSize = '0.875rem'; 
        description.style.marginBottom = '0.25rem'; 
        description.innerHTML = news.description;
        description.style.padding = '0.1rem 0.5rem';
        description.style.overflow = 'hidden';
        description.style.textOverflow = 'ellipsis';

        var link = document.createElement('a');
        link.style.color = '#fff';
        link.style.backgroundColor = '#1a1a2e';
        link.style.borderColor = '#212529';
        link.style.display = 'inline-block';
        link.style.fontWeight = '400';
        link.style.textAlign = 'center';
        link.style.verticalAlign = 'middle';
        link.style.userSelect = 'none';
        link.style.padding = '0.3rem 0.75rem';
        link.style.fontSize = '0.875rem';
        link.style.marginTop = 'auto'; 
        link.setAttribute('target', '_blank');
        link.href = news.url;
        link.innerHTML = 'Read more';
        link.style.borderRadius = '0.3rem';

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);
    });

    newsdetails.appendChild(row);
}

// Variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("search");
const newsQuery = document.getElementById("newsQuery");
const newsdetails = document.getElementById("newdetails");

// Event Listeners
generalBtn.addEventListener("click", fetchGeneralNews);
businessBtn.addEventListener("click", fetchBusinessNews);
sportsBtn.addEventListener("click", fetchSportsNews);
entertainmentBtn.addEventListener("click", fetchEntertainmentNews);
technologyBtn.addEventListener("click", fetchTechnologyNews);
searchBtn.addEventListener("click", fetchQueryNews);

// Fetch general news on page load
window.onload = fetchGeneralNews;
