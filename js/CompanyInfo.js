class CompanyInfo {
  constructor(element, symbol) {
    this.element = element;
    this.companyUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
    this.historyDataUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=ed93f3e229380c530b7a0e7663f86b99`;
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

  renderCompany(data) {
    const headerContainer = this.createHtmlElement(
      "div",
      "header-container",
      undefined
    );
    const imgContainer = this.createHtmlElement("div", "img-container");
    const image = this.createHtmlElement("img", undefined, "image");
    const header = this.createHtmlElement(
      "a",
      "header",
      "header",
      data[0].companyName
    );
    const stockContainer = this.createHtmlElement(
      "div",
      "stock-container",
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
      "description-container",
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
    headerContainer.appendChild(imgContainer);
    headerContainer.appendChild(header);
    this.element.appendChild(headerContainer);
    this.element.appendChild(stockContainer);
    this.element.appendChild(descriptionContainer);
  }

  async getProfileData() {
    const companyProfileRes = await fetch(this.companyUrl);
    const companyProfile = await companyProfileRes.json();
    const historyDataRes = await fetch(this.historyDataUrl);
    const historyData = await historyDataRes.json();
    this.renderCompany(companyProfile);
    this.addChart(historyData);
  }

  load() {
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
    this.element.appendChild(ctx);
    ctx.getContext("2d");
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "",
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
