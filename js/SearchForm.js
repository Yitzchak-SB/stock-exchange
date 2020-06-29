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
    const compareDiv = this.createHtmlElement("div", "row pt-5 mb-5");
    const compareContainer = this.createHtmlElement(
      "div",
      "col-12 row border border-black pt-3 pb-3 pr-0",
      "compare-div"
    );
    const compareLink = this.createHtmlElement(
      "a",
      "col-3 text-primary float-right p-0 text-center",
      "compare-link"
    );
    const formDiv = this.createHtmlElement("div", "row");
    const searchForm = this.createHtmlElement(
      "form",
      "col-12 row form-inline",
      "search-form"
    );
    const input = this.createHtmlElement(
      "input",
      "col-9 form-control",
      "search-input",
      "text"
    );
    const button = this.createHtmlElement(
      "button",
      "col-3 btn btn-primary",
      undefined,
      "submit"
    );
    const span = this.createHtmlElement("span", "loader", "loader");
    input.placeholder = "Search a Stock Here";
    compareLink.innerText = "Compare Companies";
    compareLink.style = "cursor: pointer;";
    compareLink.href = "/company.html?symbols=";
    compareContainer.style = "display: block";
    compareDiv.appendChild(compareContainer);
    compareContainer.appendChild(compareLink);
    searchForm.appendChild(input);
    button.innerText = "Search";
    searchForm.appendChild(button);
    searchForm.appendChild(span);
    formDiv.appendChild(searchForm);
    document.getElementById("compare").appendChild(compareDiv);
    this.formElement.appendChild(formDiv);
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
