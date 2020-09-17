const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("./forcast");

const app = express();

const publicDir = path.join(__dirname, "../public");
const templateDir = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templateDir);
app.use(express.static(publicDir));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Shyam",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "shyam",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: "i need a help",
    name: "shyam",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "kya weather dekhega re tu",
    });
  }
  weather.forcast(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    res.send({ response });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "be ba boo ba",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 Page",
    data: "we do not have that page please go to home page",
  });
});

app.listen(3000, () => {
  console.log("server is started on 3000");
});
