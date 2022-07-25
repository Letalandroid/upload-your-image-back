const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const override = require("method-override");
const path = require("path");
const rutasGenerales = require("./routes/general.routes")
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(override("_method"));
app.use(rutasGenerales);
app.use(cors());

// DB Connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch((err: any) => console.log(err));

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://upload-your-image-backend.herokuapp.com/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = app;