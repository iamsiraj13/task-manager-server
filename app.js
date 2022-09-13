// basic lib import
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const routes = require("./src/routes/api");

// security middleware import

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// database lib import
const mongoose = require("mongoose");

// security middleware implement

app.use(
  cors({
    origin: "https://task-manager-siraj.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Body parser implement
app.use(bodyParser.json());

// Mongo DB Database Connection
const URL =
  "mongodb+srv://<username>:<password>@cluster0.4tdkj.mongodb.net/task?retryWrites=true&w=majority";

let OPTION = { user: "iamsiraj13", pass: "iamsiraj13", autoIndex: true };

mongoose.connect(URL, OPTION, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database Connected");
  }
});

// routing implement
app.use("/api", routes);

// undefined route implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "Fail", data: "Not Found" });
});

module.exports = app;
