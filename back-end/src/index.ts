require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// const authJwt = require("./helpers/jwt");
// const errorHandler = require("./helpers/error-handler");

const ENV: string = "dev";

let DB_CONN = process.env.NJPS_DEV_CONN;

if (ENV === "prod") {
  DB_CONN = process.env.NJPS_PRD_CONN;
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const domain = "http://localhost:4200";

app.use(
  cors({
    origin: [domain],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

//middleware
app.use(bodyParser.json());
// app.use(morgan('combined'));
app.use(morgan("tiny"));
// app.use(authJwt());

app.use(express.static(__dirname + "/public"));
// app.use(errorHandler);

//Routes
const weatherRouter = require("./routes/weather.routes");


const api = process.env.API_URL;

app.get("/", function (req, res) {
  console.log("Root Route");
  res.json({
    message: "hello world",
  });
});

app.use("/api/weather", weatherRouter);

/* //Database
mongoose
  .connect(DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "projectgreen-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  }); */

//Server
const port = 3000;
app.listen(3000, () => {
  console.log(`Server is running on  ${port}`);
});