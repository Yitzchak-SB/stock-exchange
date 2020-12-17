const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const express = require("express");
const url = require("url");
const { ObjectID } = require("mongodb");
require("es6-promise").polyfill();
require("isomorphic-fetch");
const app = express();

const mongoUrl = "mongodb://localhost:27017";
const dbName = "stockExchange";

const client = new MongoClient(mongoUrl);

const updateDocument = (data) => {
  const db = client.db(dbName);
  const collection = db.collection("search");
  collection.insertOne(data);
};

const readDocument = async () => {
  const db = client.db(dbName);
  const collection = db.collection("search");
  return collection.find({}).toArray();
};

readOneDocument = async (document) => {
  const db = client.db(dbName);
  const collection = db.collection("search");
  return collection.findOne(document);
};

const deleteDocument = (docId) => {
  const db = client.db(dbName);
  const collection = db.collection("search");
  collection.deleteOne(docId, (err) => {
    if (err) {
      console.error("could not delete the document");
      console.log(err);
    }
  });
};

async function apiSearch(searchTerm) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`,
    (err) => {
      if (err) console.error("Fetch failed");
    }
  );
  const data = await response.json();
  return data;
}

async function singleProfileFetch(symbol) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/company/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`,
    (err) => {
      if (err) console.error("Fetch failed");
    }
  );
  const data = await response.json();
  return data;
}

async function fetchApiProfile(searchTerm) {
  const companies = await apiSearch(searchTerm);
  const fetchCompaniesProfiles = companies.map((company) => {
    return singleProfileFetch(company.symbol);
  });
  const companiesProfiles = await Promise.all(fetchCompaniesProfiles);
  return companiesProfiles;
}

app.get("/search", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const urlObj = url.parse(req.url, true);

  let inputQuery = urlObj.query.query;
  const data = await fetchApiProfile(inputQuery);
  res.send(data);
  client.connect(async function (err) {
    useUnifiedTopology: true;
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const search = { date: Date(), searchedQuery: inputQuery, results: data };
    updateDocument(search);
    client.close();
  });
});

app.get("/search-history", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  client.connect(async function (err) {
    useUnifiedTopology: true;
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const searchHistory = await readDocument();
    res.send(searchHistory);

    await client.close();
  });
});

app.get("/search-history/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  id = req.params;
  const objId = new ObjectID(id.id);
  const docId = {};
  docId._id = objId;
  client.connect(async function (err) {
    useUnifiedTopology: true, assert.equal(null, err);
    console.log("Connected successfully to server");
    deleteDocument(docId);
    client.close();
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at Port ${port}...`);
});
