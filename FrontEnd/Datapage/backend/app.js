const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");
const routes = require("./routes.js");
const bodyParser = require("body-parser");
//import function
const fetchData = require("./utils/rapidApi.js");
//Loads the handlebars module
const { engine } = require("express-handlebars");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/public")));

//Sets our app to use the handlebars engine
// app.set("view engine", "hbs");
// app.set("views", "./views");
// app.use("/api", routes);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  engine({
    defaultLayout: "main", // Optional: Set a default layout
    extname: ".hbs", // Optional: Specify the file extension
  })
);

const PORT = 3000;

// app.get("/info", (req, res) => {
//   // res.send('data.html'); //how to serve static file as html
//   res.send(getData())
// });

const { error } = require("console");

app.use(
  express.static("frontend/public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.get("/", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  // res.render("index");
  res.render("index", {
    layout: "main",
    title: "My Website",
    // message: "Welcome to my website!",
  });
});

app.get("/data", (req, res) => {
  res.sendFile("Datapage/frontend/data.html");
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
  // console.log(city, state);
  // fetchData();
  if (!city || !state) {
    return res.status(400).json({ error: "City and state are required." });
  }

  const data = await fetchData(city, state);
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
