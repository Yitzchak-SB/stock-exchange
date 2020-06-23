(() => {
  class Marquee {
    constructor(symbol, price, change) {
      this.symbol = symbol;
      this.price = price;
      this.change = change;
      this.createMarquee();
    }

    createMarquee() {
      const marqueeHolder = document.getElementById("marquee-holder");
      let fragment = new DocumentFragment();
      const span = document.createElement("span");
      span.className = "marquee-card";
      span.innerText = this.symbol + " " + this.price + " " + this.change;
      fragment.appendChild(span);
      marqueeHolder.appendChild(fragment);
    }
  }

  const getMarquee = async () => {
    let marqueeUrl =
      "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=ed93f3e229380c530b7a0e7663f86b99";
    const marqueeFetch = await fetch(marqueeUrl);
    const marqueeData = await marqueeFetch.json();
    for (let i = 0; i < marqueeData.length; i++) {
      if (marqueeData[i].price == null && marqueeData[i].change == null) {
        continue;
      } else {
        new Marquee(
          marqueeData[i].symbol,
          marqueeData[i].price,
          marqueeData[i].change
        );
      }
    }
  };

  getMarquee();
})();
