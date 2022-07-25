const Mongoose = require("mongoose");
const { Schema, model } = Mongoose;

const imageSchema = new Schema(
  {
    image: String
  },
  { versionKey: false },
);

// Crear un modelo
const newImage = Mongoose.model("images", imageSchema);

module.exports = newImage;
