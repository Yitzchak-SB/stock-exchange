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
    const searchHistoryDiv = createHtmlElement("div", "row pt-5 mb-5");
    const searchHistoryLink = createHtmlElement(
      "a",
      "bg-primary text-white col-2 p-3 rounded",
      undefined,
      "Search History"
    );
    searchHistoryLink.href = "./search-history.html";
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
    searchHistoryDiv.appendChild(searchHistoryLink);
    compareDiv.appendChild(compareContainer);
    compareContainer.appendChild(compareLink);
    searchForm.appendChild(input);
    searchForm.appendChild(button);
    searchForm.appendChild(span);
    formDiv.appendChild(searchForm);
    document.getElementById("compare").appendChild(searchHistoryDiv);
    document.getElementById("compare").appendChild(compareDiv);
    this.formElement.appendChild(formDiv);
  }

  async getSearchResult(searchInput, callback) {
    if (searchInput === "") {
      if (document.querySelector(".list-group")) {
        document.querySelector(".list-group").remove();
      }
      return;
    }

    const response = await fetch(
      `http://localhost:3000/search?query=${searchInput}`
    );
    const data = await response.json();
    callback(data, searchInput);
  }

  async onSearch(callback) {
    const searchForm = document.getElementById("search-form");
    let debounceTimeout;
    searchForm.addEventListener("keyup", () => {
      const searchInput = document.getElementById("search-input").value;
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        this.getSearchResult(searchInput, callback);
      }, 500);
      searchForm.addEventListener("submit", (event) => {
        const searchInput = document.getElementById("search-input").value;
        event.preventDefault();
        clearTimeout(debounceTimeout);
        this.getSearchResult(searchInput, callback);
      });
    });
  }
}
