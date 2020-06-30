import { createHtmlElement } from "./module.js";

export class SearchForm {
  constructor(element) {
    this.formElement = element;
    this.html = this.generateForm();
  }

  createSpinner(element) {
    const spinnerDiv = createHtmlElement("div", "spinner-border", "spinner");
    spinnerDiv.role = "status";
    const spinnerSpan = createHtmlElement(
      "span",
      "sr-only",
      undefined,
      "Loading..."
    );
    spinnerDiv.appendChild(spinnerSpan);
    element.appendChild(spinnerDiv);
  }

  deleteSpinner() {
    document.getElementById("spinner").remove();
  }

  generateForm() {
    const compareDiv = createHtmlElement("div", "row pt-5 mb-5");
    const compareContainer = createHtmlElement(
      "div",
      "col-12 row border border-black pt-3 pb-3 pr-0",
      "compare-div"
    );
    const compareLink = createHtmlElement(
      "a",
      "col-3 text-primary float-right p-0 text-center",
      "compare-link",
      "Compare Companies"
    );
    const formDiv = createHtmlElement("div", "row");
    const searchForm = createHtmlElement(
      "form",
      "col-12 row form-inline",
      "search-form"
    );
    const input = createHtmlElement(
      "input",
      "col-9 form-control",
      "search-input",
      undefined,
      undefined,
      "text"
    );
    const button = createHtmlElement(
      "button",
      "col-2 btn btn-primary",
      undefined,
      "Search",
      undefined,
      "submit"
    );
    const span = createHtmlElement("span", "loader", "loader");
    input.placeholder = "Search a Stock Here";
    compareLink.style = "cursor: pointer;";
    compareLink.href = "/company.html?symbols=";
    compareContainer.style = "display: block";
    compareDiv.appendChild(compareContainer);
    compareContainer.appendChild(compareLink);
    searchForm.appendChild(input);
    searchForm.appendChild(button);
    searchForm.appendChild(span);
    formDiv.appendChild(searchForm);
    document.getElementById("compare").appendChild(compareDiv);
    this.formElement.appendChild(formDiv);
  }

  async getSearchData(data, callback) {
    const form = document.getElementById("form");
    this.createSpinner(form);
    const finalResult = [];
    data.map(async (item, index) => {
      let resultsResponseUrl = `https://financialmodelingprep.com/api/v3/profile/${item.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
      let searchResultFetch = await fetch(resultsResponseUrl);
      let searchResultImg = await searchResultFetch.json();
      finalResult.push(searchResultImg[0]);
      if (index === data.length - 1) {
        this.deleteSpinner();
        callback(finalResult);
      }
    });
  }

  getSearchResult(callback) {
    const searchInput = document.getElementById("search-input").value;
    if (searchInput === "") {
      if (document.querySelector(".list-group")) {
        document.querySelector(".list-group").remove();
      }

      return;
    }

    let stockUrl = `https://financialmodelingprep.com/api/v3/search?query=${searchInput.toUpperCase()}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`;
    loader.classList.add("active");
    fetch(stockUrl)
      .then((response) => response.json())
      .then((data) => {
        this.getSearchData(data, callback);
      });
  }

  async onSearch(callback) {
    const searchForm = document.getElementById("search-form");
    let debounceTimeout;
    searchForm.addEventListener("keyup", () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        this.getSearchResult(callback);
      }, 500);
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearTimeout(debounceTimeout);
        this.getSearchResult(callback);
      });
    });
  }
}
