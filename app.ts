const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const override = require("method-override");
const path = require("path");
const rutasGenerales = require("./routes/general.routes")
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(override("_method"));
app.use(rutasGenerales);

const cors = require("cors");

app.use(
  cors({
    origin: "https://upload-your-image.vercel.app/",
    methods: ["GET", "POST"],
  })
);

// DB Connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch((err: any) => console.log(err));

module.exports = app;