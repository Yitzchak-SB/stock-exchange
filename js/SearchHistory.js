import { createHtmlElement } from "./module.js";

export class SearchHistory {
  constructor(element) {
    this.data = undefined;
    this.element = element;
  }

  async getHistoryData() {
    const historyFetchData = await fetch(
      "http://localhost:3000/search-history"
    );
    const historyData = await historyFetchData.json();
    this.data = await historyData;
  }

  load() {
    const ul = createHtmlElement(
      "ul",
      "list-group list-group-flush",
      "list-history"
    );
    for (let i = 0; i < this.data.length; i++) {
      const searchData = this.data[i];
      const li = createHtmlElement("li", "list-group-item");
      const p = createHtmlElement(
        "p",
        undefined,
        undefined,
        `Search Term: ${searchData.searchedQuery}, Made On: ${searchData.date}`
      );
      li.href = `index.html/search?query=${searchData.searchedQuery}`;
      li.appendChild(p);
      ul.appendChild(li);
    }
    this.element.appendChild(ul);
  }
}
