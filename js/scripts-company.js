const urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.get("symbol");
let companyUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
let historyDataUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=ed93f3e229380c530b7a0e7663f86b99`;
const image = document.getElementById("image");
const header = document.getElementById("header");
const stockPrice = document.getElementById("stock-price");
const stockChange = document.getElementById("stock-change");
const description = document.getElementById("description");

const getProfile = async () => {
  loader.classList.add("active");
  const companyProfileRes = await fetch(companyUrl);
  const companyProfile = await companyProfileRes.json();
  const historyDataRes = await fetch(historyDataUrl);
  const historyData = await historyDataRes.json();
  loader.classList.remove("active");

  image.src = companyProfile[0].image;
  image.alt = companyProfile[0].companyName;
  header.innerText = companyProfile[0].companyName;
  header.href = companyProfile[0].website;
  stockPrice.innerText = `Stock Price: $${companyProfile[0].price}`;
  stockChange.innerText = `(${companyProfile[0].changes})`;
  if (companyProfile[0].changes > 0) {
    stockChange.classList.remove("text-red");
    stockChange.classList.add("text-green");
  } else {
    stockChange.classList.remove("text-green");
    stockChange.classList.add("text-red");
  }
  description.innerText = companyProfile[0].description;
  let ctx = document.getElementById("my-chart").getContext("2d");
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: [
        historyData.historical[0].date,
        historyData.historical[1].date,
        historyData.historical[2].date,
        historyData.historical[3].date,
        historyData.historical[4].date,
        historyData.historical[5].date,
        historyData.historical[6].date,
        historyData.historical[7].date,
        historyData.historical[8].date,
        historyData.historical[9].date,
        historyData.historical[10].date,
        historyData.historical[11].date,
        historyData.historical[12].date,
        historyData.historical[13].date,
        historyData.historical[14].date,
        historyData.historical[15].date,
        historyData.historical[16].date,
        historyData.historical[17].date,
        historyData.historical[18].date,
        historyData.historical[19].date,
      ],
      datasets: [
        {
          label: `${symbol}`,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [
            historyData.historical[0].close,
            historyData.historical[1].close,
            historyData.historical[2].close,
            historyData.historical[3].close,
            historyData.historical[4].close,
            historyData.historical[5].close,
            historyData.historical[6].close,
            historyData.historical[7].close,
            historyData.historical[8].close,
            historyData.historical[9].close,
            historyData.historical[10].close,
            historyData.historical[11].close,
            historyData.historical[12].close,
            historyData.historical[13].close,
            historyData.historical[14].close,
            historyData.historical[15].close,
            historyData.historical[16].close,
            historyData.historical[17].close,
            historyData.historical[18].close,
            historyData.historical[19].close,
          ],
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

getProfile();
