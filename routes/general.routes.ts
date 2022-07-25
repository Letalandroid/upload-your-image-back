const { Router } = require("express");
const cloudinary = require("cloudinary");
const router = Router();
const pat = require("path");
const dv = require("dotenv");
const cors = require("cors");
const imagesModel = require("../models/images");
dv.config();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: pat.join(__dirname, "../public/uploads"),

  filename: (_req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(cors({
  origin: "*",
}));

router.get("/images", (_req: any, res: any) => {
  imagesModel.find({}, (err: any, images: any) => {
    if (err) {
      res.status(500).json({
        message: "Error al obtener las imagenes",
        error: err,
      });
    } else {
      res.status(200).json({
        message: "Imagenes obtenidas correctamente",
        images,
      });
    }
  })
});

router.post("/upload", upload.single("image"), async (req: any, res: any) => {
  try {
    await cloudinary.uploader.upload(req.file.path, async (err: any) => {
      if (Object.keys(err).length > 3) {
        const newPost = new imagesModel({
          image: err.url
        });

        await newPost.save();
        res.redirect("https://upload-your-image.vercel.app/");
      } else {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
