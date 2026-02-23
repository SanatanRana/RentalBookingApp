const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

let storage;

if (process.env.CLOUD_NAME && process.env.CLOUD_API && process.env.CLOUD_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API,
        api_secret: process.env.CLOUD_API_SECRET
    });

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'Wanderlust_DEV',
            allowed_formats: ['jpeg', 'png', 'jpg']
        }
    });
    console.log("Using Cloudinary for storage");
} else {
    // Fallback to local storage
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    console.log("Cloudinary credentials missing. Falling back to Local Storage (public/uploads)");
}

module.exports = {
    cloudinary,
    storage,
    isLocal: !(process.env.CLOUD_NAME && process.env.CLOUD_API && process.env.CLOUD_API_SECRET)
}