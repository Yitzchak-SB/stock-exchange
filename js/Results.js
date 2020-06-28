class Results {
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
    if (string.includes(searchInput)) {
      output = string.replace(searchInput, `<mark>${searchInput}</mark>`);
    }
    return output;
  }

  createHtmlElement(element, className, innerHTML) {
    const newElement = document.createElement(element);
    if (className != undefined) {
      newElement.className = className;
    }
    if (innerHTML != undefined) {
      newElement.innerHTML = innerHTML;
    }
    return newElement;
  }

  renderResults(object) {
    this.resultsData = object;
    if (this.counter > 0) {
      document.querySelector(".search-results-display").remove();
    }
    let fragment = new DocumentFragment();
    const ul = this.createHtmlElement("ul", "search-results-display");
    this.counter++;
    fragment.appendChild(ul);

    this.createResultList(ul);
    this.resultsElement.appendChild(fragment);
  }

  createResultList(element) {
    this.resultsData.map((item, index) => {
      if (item.companyName != null || item.symbol != null) {
        item.companyName = this.highlightSearch(item.companyName);
        let symbol = this.highlightSearch(item.symbol);
        const li = this.createHtmlElement("li", "result-item");
        const p = this.createHtmlElement("p", undefined, symbol);
        const img = this.createHtmlElement("img", "img-search");
        img.src = item.image;
        img.alt = item.companyName;
        const a = this.createHtmlElement("a", undefined, item.companyName);
        a.href = `/company.html?symbol=${item.symbol}`;
        const span = this.createHtmlElement("span");
        span.innerText = item.changes;
        this.greenOrRed(span, item.changes);
        const button = this.createHtmlElement("button", "compare-button");
        button.id = `${index}`;
        button.innerText = "Compare";
        button.addEventListener("click", (event, item) => {
          item = this.resultsData;
          console.log(item[index]);
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
}
