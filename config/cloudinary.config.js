const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "mp3", "mp4"],
    folder: "reject-me", // The name of the folder in cloudinary
    resource_type: "auto", // => this is in case you want to upload other types of files, not just images
  }
});
 
module.exports = multer({ storage });