const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// configure cloudinary 1
cloudinary.config({
  cloud_name: process.env.APP_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storageOptions = (folderName) =>
  new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: folderName,
      format: file.mimetype.split("/")[1],
      public_id: `${folderName}-${Date.now()}`,
    }),
  });

const userStorage = new CloudinaryStorage(storageOptions("user-profile"));
const productStorage = new CloudinaryStorage(storageOptions("products"));

const uploadOptions = (storage) => ({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

const uploadUser = multer(uploadOptions(userStorage));
const uploadProduct = multer(uploadOptions(productStorage));

module.exports = { uploadUser, uploadProduct };
