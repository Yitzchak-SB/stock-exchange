import { CompareCompany } from "./CompareCompany.js";

export class Results {
  constructor(element) {
    this.resultsElement = element;
    this.resultsData = null;
    this.counter = 0;
    this.companyName = "";
    this.symbol = "";
  }

  greenOrRed(element, value) {
    if (value > 0) {
      element.style.color = "green";
    } else {
      element.style.color = "red";
    }
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

  createHtmlElement(element, className, innerHTML) {
    const newElement = document.createElement(element);
    if (innerHTML != undefined) {
      newElement.innerHTML = innerHTML;
    }
    if (className != undefined) {
      newElement.className = className;
    }

    return newElement;
  }

  renderResults(object) {
    this.resultsData = object;
    if (this.counter > 0) {
      document.querySelector(".list-group").remove();
    }
    let fragment = new DocumentFragment();
    const ul = this.createHtmlElement("ul", "list-group");
    this.counter++;
    fragment.appendChild(ul);

    this.createResultList(ul);
    this.resultsElement.appendChild(fragment);
  }

  createResultList(element) {
    const companyData = this.resultsData;
    companyData.map((item, index) => {
      if (item.companyName != null || item.symbol != null) {
        let companyName = this.highlightSearch(item.companyName);
        let symbol = this.highlightSearch(item.symbol);
        const li = this.createHtmlElement(
          "li",
          "list-group-item row justify-content-around results-item"
        );
        const p = this.createHtmlElement("span", "col-3", `${symbol}`);
        const img = this.createHtmlElement("img", "col-3");
        img.src = item.image;
        img.alt = item.companyName;
        const a = this.createHtmlElement("a", "col-5", companyName);
        a.href = `/company.html?symbol=${item.symbol}`;
        const span = this.createHtmlElement("span", "col-2");
        span.innerText = item.changes;
        this.greenOrRed(span, item.changes);
        const button = this.createHtmlElement(
          "button",
          "btn btn-primary col-2 comp-btn"
        );
        button.id = `button-${index}`;
        button.innerText = "Compare";
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
    const compareName = this.createHtmlElement(
      "span",
      "m-1 p-1 bg-primary text-white col-2 rounded",
      Results.compareIndex
    );
    compareName.style = "cursor: pointer;";
    const spanName = this.createHtmlElement("span", "pr-5");
    spanName.innerText = item[index].symbol;
    const spanX = this.createHtmlElement("span");
    spanX.innerText = "X";
    compareName.appendChild(spanName);
    compareName.appendChild(spanX);
    compareDiv.appendChild(compareName);
    compareName.addEventListener("click", () => {
      compareDiv.removeChild(compareName);
    });
  }
}
