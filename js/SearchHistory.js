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

      const li = createHtmlElement("li", "list-group-item row");
      const span = createHtmlElement(
        "span",
        undefined,
        undefined,
        `Search Term: ${searchData.searchedQuery}, Made On: ${searchData.date}`
      );
      const a = createHtmlElement("a", "col-8");
      const button = createHtmlElement(
        "button",
        "btn btn-primary col-2",
        undefined,
        "Delete"
      );
      a.href = `../index.html?query=${searchData.searchedQuery}`;
      button.addEventListener("click", () => {
        fetch(`http://localhost:3000/search-history/${searchData._id}`, {
          method: "Get", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin});
        });
      });
      a.appendChild(span);
      li.appendChild(a);
      li.appendChild(button);
      ul.appendChild(li);
    }
    this.element.appendChild(ul);
  }
}
