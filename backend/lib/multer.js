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

// win tkhabi les images f server 2
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user-profile",
    format: async (req, file) => file.mimetype.split("/")[1], // Dynamic format
    public_id: (req, file) => `user-${Date.now()}`,
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
