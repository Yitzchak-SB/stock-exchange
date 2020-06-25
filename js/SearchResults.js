class Results {
  constructor(element) {
    this.resultsElement = element;
    this.resultsData = null;
    this.counter = 0;
  }

  renderResults(object) {
    this.resultsData = object;
    if (this.counter > 0) {
      document.querySelector(".search-results-display").remove();
    }
    let fragment = new DocumentFragment();

    const ul = document.createElement("ul");
    ul.className = "search-results-display";
    fragment.appendChild(ul);
    this.resultsData.map((item) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      const img = document.createElement("img");
      const a = document.createElement("a");
      const span = document.createElement("span");
      li.className = "result-item";
      ul.appendChild(li);
      img.className = "img-search";
      img.src = item.image;
      img.alt = item.companyName;
      li.appendChild(img);
      a.href = `/company.html?symbol=${item.symbol}`;
      a.innerText = item.companyName;
      li.appendChild(a);
      p.innerText = item.symbol;
      li.appendChild(p);
      span.innerText = item.changes;

      if (item.changes > 0) {
        span.style.color = "green";
      } else {
        span.style.color = "red";
      }
      li.appendChild(span);
    });
    this.resultsElement.appendChild(fragment);
    this.counter++;
  }
}
