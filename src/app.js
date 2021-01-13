const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com
// app.com/help
// app.com/about

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/tech", (req, res) => {
  res.render("tech");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    axios.post("https://the-cast-940b0-default-rtdb.firebaseio.com/location", {
      latitude,
      longitude,
      location
    })
    .then( response => {
        console.log(response);
    } )

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: forecastData,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  console.log(req.query.rating);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Server is up on port " + port + "...");
});

console.log('success')