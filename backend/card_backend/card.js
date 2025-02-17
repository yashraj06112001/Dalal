const path = require("path");

const multer = require("multer");
const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "video"));
  },
  filename: function (req, file, cb) {
    let originalExt = path.extname(file.originalname); // Get original file extension
    let safeName = req.headers["name"]
      ? req.headers["name"].replace(/\s+/g, "_")
      : "default"; // Remove spaces
    cb(null, `${safeName}${originalExt}`); // Save as "username.mp4"
  },
});
const uploadVideo = multer({ storage: storageVideo });

const saveImage = (req) => {
  return new Promise((resolve, reject) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "image")); // Save in "../image" folder
      },
      filename: function (req, file, cb) {
        if (!req.body.name) {
          return cb(new Error("Missing 'name' field in request body"), null);
        }
        const index = req.fileIndex || 0; // Ensure index tracking
        const filename = `${req.body.name}${index}${path.extname(
          file.originalname
        )}`;
        req.fileIndex = index + 1; // Increment for the next file
        cb(null, filename);
      },
    });

    const upload = multer({ storage }).array("images", 10); // Accept up to 10 images

    upload(req, {}, (err) => {
      if (err) {
        reject(err);
      } else if (!req.files || req.files.length === 0) {
        reject(new Error("No images uploaded"));
      } else {
        const filenames = req.files.map(
          (file, index) =>
            `${req.body.name}${index}${path.extname(file.originalname)}`
        );
        resolve(filenames);
      }
    });
  });
};

module.exports = { uploadVideo, saveImage };
