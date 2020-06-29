export class CompareCompany {
  static dataHolder = {};
  constructor(item, element) {
    this.companyData = item;
    this.element = element;
    CompareCompany.dataHolder[this.companyData.symbol] = item;
    this.index = CompareCompany.compareIndex;
  }

  static displayData() {
    console.log(CompareCompany.dataHolder);
  }

  createSpan(item, index) {
    const compareDiv = document.getElementById("compare-div");
    const compareName = this.createHtmlElement(
      "span",
      "m-1 p-1 bg-primary text-white col-2 rounded",
      CompareCompany.compareIndex
    );

    CompareCompany.compareIndex++;
    compareName.style = "cursor: pointer;";
    const spanName = this.createHtmlElement("span", "pr-5");
    spanName.innerText = item.symbol;
    const spanX = this.createHtmlElement("span");
    spanX.innerText = "X";
    compareName.appendChild(spanName);
    compareName.appendChild(spanX);
    compareDiv.appendChild(compareName);
    compareName.addEventListener("click", () => {
      this.removeSpan(compareName);
    });
  }

  removeSpan(compareName) {
    const compareDiv = document.getElementById("compare-div");
    compareDiv.removeChild(compareName);
    delete CompareCompany.dataHolder[this.companyData.symbol];
    CompareCompany.displayData();
    this.element.disabled = false;
  }

  createHtmlElement(element, className, id) {
    const newElement = document.createElement(element);
    if (className != undefined) {
      newElement.className = className;
    }
    if (id != undefined) {
      newElement.id = id;
    }
    return newElement;
  }
}
