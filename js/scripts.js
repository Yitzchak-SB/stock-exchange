const searchInput = document.getElementById("search-input");
const searchResultsDisplay = document.getElementById("search-results-display");
const searchForm = document.getElementById("search-form");
const loader = document.getElementById("loader");
const marqueeHolder = document.getElementById("marquee-holder");

/*const getMarquee = async () => {
  let fragment = new DocumentFragment();
  let marqueeUrl =
    "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=ed93f3e229380c530b7a0e7663f86b99";
  const marqueeFetch = await fetch(marqueeUrl);
  const marqueeData = await marqueeFetch.json();
  for (let i = 0; i < marqueeData.length; i++) {
    if (marqueeData[i].price == null && marqueeData[i].change == null) {
      continue;
    } else {
      const span = document.createElement("span");
      span.className = "marquee-card";
      span.innerText =
        marqueeData[i].symbol +
        " " +
        marqueeData[i].price +
        " " +
        marqueeData[i].change;
      fragment.appendChild(span);
    }
  }
  marqueeHolder.appendChild(fragment);
};
*/
const getSearchResults = async () => {
  let stockUrl = `https://financialmodelingprep.com/api/v3/search?query=${searchInput.value.toUpperCase()}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`;

  loader.classList.add("active");
  const resultsResponse = await fetch(stockUrl);
  const dataList = await resultsResponse.json();
  return dataList;
};

const getSearchResultsImage = async () => {
  searchResultsData.map(async (item) => {
    let resultsResponseUrl = `https://financialmodelingprep.com/api/v3/profile/${item.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
    let searchResultFetch = await fetch(resultsResponseUrl);
    let searchResultImg = await searchResultFetch.json();
    searchResultLayout(searchResultImg, item);
  });
  loader.classList.remove("active");
};

const searchResultLayout = (searchResultImg, item) => {
  let fragment = new DocumentFragment();
  const li = document.createElement("li");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const a = document.createElement("a");
  const span = document.createElement("span");

  li.className = "result-item";
  fragment.appendChild(li);
  img.className = "img-search";
  img.src = searchResultImg[0].image;
  img.alt = searchResultImg[0].name;
  li.appendChild(img);
  a.href = `/company.html?symbol=${item.symbol}`;
  a.innerText = item.name;
  li.appendChild(a);
  p.innerText = item.symbol;
  li.appendChild(p);
  span.innerText = searchResultImg[0].changes;
  if (searchResultImg[0].changes > 0) {
    span.style.color = "green";
  } else {
    span.style.color = "red";
  }
  li.appendChild(span);

  searchResultsDisplay.appendChild(fragment);
};

let searchResultsData = {};

searchForm.addEventListener("submit", async (event) => {
  searchResultsDisplay.innerHTML = "";
  event.preventDefault();
  searchResultsData = await getSearchResults();

  getSearchResultsImage();
});
