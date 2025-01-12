const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");
//import function
const fetchData = require("./utils/rapidApi.js");
//Loads the handlebars module
const { engine } = require("express-handlebars");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/public")));

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs", // Optional: Specify the file extension
  })
);

const PORT = 3000;

app.get("/", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("index", {
    layout: "main",
    title: "My Website",
  });
});

app.get("/api/data", (req, res) => {
  if (!req.query.state && !req.query.city) {
    res.send({
      error: "Enter a valid search",
    });
  }
});

app.get("/api/resources", async (req, res) => {
  const { city, state } = req.query; // e.g., "Charlotte, NC"
  if (!city || !state) {
    return res.status(400).json({ error: "City and state are required." });
  }
  const data = await fetchData(city, state);
  try {
    const data = await fetchData(city, state);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch resources." });
  }
  // res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
