var express = require("express");
var app = express();
var dotenv = require("dotenv");
var morgan = require("morgan");
var override = require("method-override");
var path = require("path");
var rutasGenerales = require("./routes/general.routes");
dotenv.config();
var cors = require("cors");
app.use(cors({
    origin: "https://upload-your-image.vercel.app/",
    methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(override("_method"));
app.use(rutasGenerales);
// DB Connection
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () { return console.log('DB Connected'); })["catch"](function (err) { return console.log(err); });
module.exports = app;
