const searchInput = document.getElementById("search-input");
const searchResultsDisplay = document.getElementById("search-results-display");
const searchForm = document.getElementById("search-form");
const loader = document.getElementById("loader");

const getSearchResults = async () => {
  let stockUrl = `https://financialmodelingprep.com/api/v3/search?query=${searchInput.value.toUpperCase()}&limit=10&exchange=NASDAQ&apikey=d0b2f081c9efa8ff0333ade3ed59ebfc`;
  let displaySearchResult = "";
  loader.classList.add("active");
  const resultsResponse = await fetch(stockUrl);
  const dataList = await resultsResponse.json();
  for (let i = 0; i < dataList.length; i++) {
    displaySearchResult += ` <li class="result-item"><a href="/company.html?symbol=${dataList[i].symbol}"> ${dataList[i].name} (${dataList[i].symbol}) </a></li>`;
  }
  loader.classList.remove("active");
  searchResultsDisplay.innerHTML = displaySearchResult;
};

searchForm.addEventListener("submit", (event) => {
  searchResultsDisplay.innerHTML = "";
  event.preventDefault();
  getSearchResults();
});
