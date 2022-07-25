var Mongoose = require("mongoose");
var Schema = Mongoose.Schema, model = Mongoose.model;
var imageSchema = new Schema({
    image: String
}, { versionKey: false });
// Crear un modelo
var newImage = Mongoose.model("images", imageSchema);
module.exports = newImage;
