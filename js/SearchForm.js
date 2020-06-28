class SearchForm {
  constructor(element) {
    this.formElement = element;
    this.html = this.generateForm();
  }

  createHtmlElement(element, className, id, type) {
    const newElement = document.createElement(element);
    if (className != undefined) {
      newElement.className = className;
    }
    if (id != undefined) {
      newElement.id = id;
    }
    if (type != undefined) {
      newElement.type = type;
    }
    return newElement;
  }

  generateForm() {
    const searchForm = this.createHtmlElement(
      "form",
      "search-form",
      "search-form"
    );
    const input = this.createHtmlElement(
      "input",
      "search-input",
      "search-input",
      "text"
    );
    const button = this.createHtmlElement(
      "button",
      "search-button",
      undefined,
      "submit"
    );
    const span = this.createHtmlElement("span", "loader", "loader");
    input.placeholder = "Search a Stock Here";
    searchForm.appendChild(input);
    button.innerText = "Search";
    searchForm.appendChild(button);
    searchForm.appendChild(span);
    this.formElement.appendChild(searchForm);
  }

  async onSearch(callback) {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");

    const getSearchData = async (data) => {
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
          getSearchData(data);
        });
    };

    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      getSearchResults();
    });
  }
}
