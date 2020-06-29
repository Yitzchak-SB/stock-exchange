export class CompanyInfo {
  constructor(element, symbol) {
    this.element = element;
    this.symbol = symbol;
    this.symbolsList = this.createSymbolList();
  }

  createSymbolList() {
    if (this.symbol != null) {
      return this.symbol.split(", ");
    } else {
      const params = new URLSearchParams(location.search);
      return [params.get("symbol"), ""];
    }
  }

  greenOrRed(element, value) {
    if (value > 0) {
      element.style.color = "green";
    } else {
      element.style.color = "red";
    }
  }

  createHtmlElement(element, className, id, innerText) {
    const newElement = document.createElement(element);
    if (className != undefined) {
      newElement.className = className;
    }
    if (id != undefined) {
      newElement.id = id;
    }
    if (innerText != undefined) {
      newElement.innerText = innerText;
    }
    return newElement;
  }

  async renderCompany(data) {
    const card = this.createHtmlElement(
      "div",
      "card shadow-lg col m-4 p-4",
      `card-${data[0].symbol}`
    );
    const headerContainer = this.createHtmlElement(
      "div",
      "header-container row",
      undefined
    );
    const imgContainer = this.createHtmlElement("div", "img-container col-6");
    const image = this.createHtmlElement("img", undefined, "image");
    const header = this.createHtmlElement(
      "h3",
      "header row text-primary p-3",
      "header",
      data[0].companyName
    );
    const stockContainer = this.createHtmlElement(
      "div",
      "stock-container row",
      "stock-container"
    );
    const stockPrice = this.createHtmlElement(
      "h2",
      "stock-price",
      "stock-price",
      `Stock Price: $${data[0].price}`
    );
    const stockChange = this.createHtmlElement(
      "h2",
      "stock-change",
      "stock-change",
      `(${data[0].changes})`
    );
    const descriptionContainer = this.createHtmlElement(
      "div",
      "description-container row",
      "description-container"
    );
    const loader = this.createHtmlElement("span", "loader", "loader");
    const description = this.createHtmlElement(
      "p",
      "description",
      "description",
      data[0].description
    );

    image.src = data[0].image;
    image.alt = data[0].companyName;
    header.href = data[0].website;

    this.greenOrRed(stockChange, data[0].changes);

    descriptionContainer.appendChild(loader);
    stockContainer.appendChild(stockPrice);
    stockContainer.appendChild(stockChange);
    imgContainer.appendChild(image);
    headerContainer.appendChild(header);
    headerContainer.appendChild(imgContainer);
    descriptionContainer.appendChild(description);
    card.appendChild(headerContainer);
    card.appendChild(stockContainer);
    card.appendChild(descriptionContainer);
    document.getElementById("row-div").appendChild(card);
  }

  async getProfileData() {
    this.symbolsList.map(async (item) => {
      let companyUrl = `https://financialmodelingprep.com/api/v3/profile/${item}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
      let historyDataUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${item}?serietype=line&apikey=ed93f3e229380c530b7a0e7663f86b99`;
      const companyProfileRes = await fetch(companyUrl);
      const companyProfile = await companyProfileRes.json();
      const historyDataRes = await fetch(historyDataUrl);
      const historyData = await historyDataRes.json();
      this.renderCompany(await companyProfile);
      this.addChart(await historyData);
      console.log(historyData);
    });
  }

  load() {
    const rowDiv = this.createHtmlElement("div", "row", "row-div");
    this.element.appendChild(rowDiv);
    this.getProfileData();
  }

  async addChart(historyData) {
    const chartLabels = [];
    const chartDatasets = [];

    await historyData.historical.map((item) => {
      chartLabels.push(item.date);
      chartDatasets.push(item.close);
    });

    for (let i = 0; i > historyData.historical.length; i++) {
      chartLabels.push(historyData.historical[i].date);
      chartDatasets.push(historyData.historical[i].close);
    }

    const ctx = this.createHtmlElement("canvas", "my-chart", "my-chart");
    document.getElementById(`card-${historyData.symbol}`).appendChild(ctx);
    ctx.getContext("2d");
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: historyData.symbol,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: chartDatasets,
          },
        ],
      },

      // Configuration options go here
      options: {},
    });
  }
}
