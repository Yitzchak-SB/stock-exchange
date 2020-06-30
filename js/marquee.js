import { createHtmlElement, greenOrRed } from "./module.js";

export class Marquee {
  constructor(element) {
    this.marqueeElement = element;
    this.marqueeInfo = null;
  }

  createMarquee() {
    let fragment = new DocumentFragment();
    const metaDiv = createHtmlElement("div", "marquee-holder row");
    fragment.appendChild(metaDiv);

    for (let i = 0; i < this.marqueeInfo.length; i++) {
      const div = createHtmlElement(
        "div",
        "marquee-card col pr-5 mr-5 ml-5 pl-5"
      );
      metaDiv.appendChild(div);
      const spanSymbol = createHtmlElement(
        "span",
        "text-info pr-2",
        undefined,
        this.marqueeInfo[i].symbol
      );
      const spanPrice = createHtmlElement(
        "span",
        "marquee-price pr-2",
        undefined,
        this.marqueeInfo[i].price
      );
      const spanChange = createHtmlElement(
        "span",
        "marquee-change",
        undefined,
        this.marqueeInfo[i].change
      );
      greenOrRed(spanChange, this.marqueeInfo[i].change);
      div.appendChild(spanSymbol);
      div.appendChild(spanPrice);
      div.appendChild(spanChange);
    }
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
