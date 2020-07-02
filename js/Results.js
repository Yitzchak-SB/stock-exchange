import { CompareCompany } from "./CompareCompany.js";
import { createHtmlElement, greenOrRed } from "./module.js";

export class Results {
  constructor(element) {
    this.resultsElement = element;
    this.resultsData = null;
    this.companyName = "";
    this.symbol = "";
  }

  highlightSearch(string) {
    let output = string;
    let searchInput = document
      .getElementById("search-input")
      .value.toUpperCase();
    if (string != null) {
      if (string.includes(searchInput)) {
        output = string.replace(searchInput, `<mark>${searchInput}</mark>`);
      }
    }

    return output;
  }

  renderResults(object) {
    this.resultsData = object;
    if (document.querySelector(".list-group")) {
      document.querySelector(".list-group").remove();
    }
    let fragment = new DocumentFragment();
    const ul = createHtmlElement("ul", "list-group list-group-flush");
    fragment.appendChild(ul);

    this.createResultList(ul);
    this.resultsElement.appendChild(fragment);
  }

  createResultList(element) {
    const companyData = this.resultsData;
    companyData.map((item, index) => {
      if (item.companyName != null || item.symbol != null) {
        let companyName = this.highlightSearch(item.profile.companyName);
        let symbol = this.highlightSearch(item.symbol);
        const li = createHtmlElement(
          "li",
          "list-group-item row justify-content-around results-item"
        );
        const p = createHtmlElement(
          "span",
          "col-3",
          undefined,
          undefined,
          `${symbol}`
        );
        const img = createHtmlElement("img", "col-3");
        img.src = item.profile.image;
        img.alt = item.profile.companyName;
        const a = createHtmlElement(
          "a",
          "col-5",
          undefined,
          undefined,
          companyName
        );
        a.href = `/company.html?symbol=${item.symbol}`;
        const span = createHtmlElement(
          "span",
          "col-2",
          undefined,
          item.profile.changes
        );
        greenOrRed(span, item.changes);
        const button = createHtmlElement(
          "button",
          "btn btn-primary col-2 comp-btn",
          `button-${index}`,
          "Compare"
        );
        button.addEventListener("click", () => {
          item = this.resultsData[index];
          button.disabled = true;
          const CompareItem = new CompareCompany(item, button);
          CompareItem.createSpan(item, index);
        });
        element.appendChild(li);
        li.appendChild(img);
        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(span);
        li.appendChild(button);
      }
    });
  }

  compareCompanies(item) {
    const compareDiv = document.getElementById("compare-div");
    const compareName = createHtmlElement(
      "span",
      "m-1 p-1 bg-primary text-white col-2 rounded",
      undefined,
      undefined,
      Results.compareIndex
    );
    compareName.style = "cursor: pointer;";
    const spanName = createHtmlElement(
      "span",
      "pr-5",
      undefined,
      item[index].symbol
    );
    const spanX = createHtmlElement("span", undefined, undefined, "x");
    compareName.appendChild(spanName);
    compareName.appendChild(spanX);
    compareDiv.appendChild(compareName);
    compareName.addEventListener("click", () => {
      compareDiv.removeChild(compareName);
    });
  }
}
