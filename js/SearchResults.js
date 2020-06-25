class Results {
  constructor(element) {
    this.resultsElement = element;
    this.resultsData = null;
    this.counter = 0;
    this.companyName = "";
    this.symbol = "";
  }

  highlightSearch(string) {
    let output = string;
    let searchInput = document
      .getElementById("search-input")
      .value.toUpperCase();
    let mark1 = "<mark>";
    let mark2 = "</mark>";
    if (string.includes(searchInput)) {
      output = string.replace(searchInput, mark1 + searchInput + mark2);
    }
    return output;
  }

  renderResults(object) {
    this.resultsData = object;
    if (this.counter > 0) {
      document.querySelector(".search-results-display").remove();
    }
    let fragment = new DocumentFragment();
    const ul = document.createElement("ul");
    this.counter++;
    ul.className = "search-results-display";
    fragment.appendChild(ul);

    this.resultsData.map((item, index) => {
      if (item.companyName != null || item.symbol != null) {
        item.companyName = this.highlightSearch(item.companyName);
        let symbol = this.highlightSearch(item.symbol);
        const li = document.createElement("li");
        const p = document.createElement("p");
        const img = document.createElement("img");
        const a = document.createElement("a");
        const span = document.createElement("span");
        const button = document.createElement("button");
        li.className = "result-item";
        ul.appendChild(li);
        img.className = "img-search";
        img.src = item.image;
        img.alt = item.companyName;
        li.appendChild(img);
        a.innerHTML = item.companyName;
        a.href = `/company.html?symbol=${item.symbol}`;
        li.appendChild(a);
        p.innerHTML = symbol;
        li.appendChild(p);
        span.innerText = item.changes;

        if (item.changes > 0) {
          span.style.color = "green";
        } else {
          span.style.color = "red";
        }
        li.appendChild(span);

        button.className = "compare-button";
        button.id = `${index}`;
        button.innerText = "Compare";
        button.addEventListener("click", (event, item) => {
          item = this.resultsData;
          console.log(item[index]);
        });
        li.appendChild(button);
      }
    });
    this.resultsElement.appendChild(fragment);
  }
}
