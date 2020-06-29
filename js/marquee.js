class Marquee {
  constructor(element) {
    this.marqueeElement = element;
    this.marqueeInfo = null;
  }

  greenOrRed(element, value) {
    if (value > 0) {
      element.style.color = "green";
    } else {
      element.style.color = "red";
    }
  }

  createMarquee() {
    let fragment = new DocumentFragment();
    const metaDiv = document.createElement("div");
    metaDiv.className = "marquee-holder row";
    fragment.appendChild(metaDiv);

    this.marqueeInfo.map((item) => {
      const div = document.createElement("div");
      div.className = "marquee-card col-1";
      metaDiv.appendChild(div);
      const spanSymbol = document.createElement("span");
      spanSymbol.className = "text-info";
      spanSymbol.innerText = item.symbol;
      const spanPrice = document.createElement("span");
      spanPrice.className = "marquee-price";
      spanPrice.innerText = item.price;
      const spanChange = document.createElement("span");
      spanChange.className = "marquee-change";
      spanChange.innerText = item.change;
      this.greenOrRed(spanChange, item.change);
      div.appendChild(spanSymbol);
      div.appendChild(spanPrice);
      div.appendChild(spanChange);
    });
    this.marqueeElement.appendChild(fragment);
  }

  async load() {
    let marqueeUrl =
      "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=ed93f3e229380c530b7a0e7663f86b99";
    const marqueeFetch = await fetch(marqueeUrl);
    this.marqueeInfo = await marqueeFetch.json();
    this.createMarquee();
  }
}
