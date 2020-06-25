class SearchForm {
  constructor(element) {
    this.formElement = element;
    this.html = this.createElement();
  }

  createElement() {
    const searchForm = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const span = document.createElement("span");
    searchForm.className = "search-form";
    searchForm.id = "search-form";
    input.id = "search-input";
    input.className = "search-input";
    input.type = "text";
    input.placeholder = "Search a Stock Here";
    searchForm.appendChild(input);
    button.type = "submit";
    button.className = "search-button";
    button.innerText = "Search";
    searchForm.appendChild(button);
    span.className = "loader";
    span.id = "loader";
    searchForm.appendChild(span);
    this.formElement.appendChild(searchForm);
  }

  async onSearch(callback) {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    const secondFetch = async (data) => {
      const finalResult = [];
      data.map(async (item, index) => {
        let resultsResponseUrl = `https://financialmodelingprep.com/api/v3/profile/${item.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
        let searchResultFetch = await fetch(resultsResponseUrl);
        let searchResultImg = await searchResultFetch.json();
        finalResult.push(searchResultImg[0]);
        if (index === data.length - 1) {
          callback(finalResult);
        }
      });
      loader.classList.remove("active");
    };

    const getSearchResults = async () => {
      let stockUrl = `https://financialmodelingprep.com/api/v3/search?query=${searchInput.value.toUpperCase()}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`;
      loader.classList.add("active");
      fetch(stockUrl)
        .then((response) => response.json())
        .then((data) => {
          secondFetch(data);
        });
    };

    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      getSearchResults();
    });
  }
}
