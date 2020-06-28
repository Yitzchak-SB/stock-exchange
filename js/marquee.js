class Marquee {
  constructor(element) {
    this.marqueeElement = element;
    this.marqueeInfo = null;
  }

  createMarquee() {
    let fragment = new DocumentFragment();

    const div = document.createElement("div");
    div.className = "marquee-holder";
    fragment.appendChild(div);

    this.marqueeInfo.map((item) => {
      const span = document.createElement("span");
      span.className = "marquee-card";
      span.innerText = `${item.symbol} ${item.price} ${item.change}`;
      div.appendChild(span);
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
