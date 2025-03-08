const multer = require("multer");
const path = require("path");

// Function to handle image uploads
const uploadImages = async (images, name) => {
  return new Promise((resolve, reject) => {
    const uploadedFiles = [];

    // Loop through each image and process it separately
    images.forEach((image, index) => {
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, "../image"));
        },
        filename: (req, file, cb) => {
          const customFileName = `${name}_${index}${path.extname(
            file.originalname
          )}`;
          uploadedFiles.push(customFileName);
          cb(null, customFileName);
        },
      });

      const upload = multer({ storage }).single("image");

      // Call upload function
      upload({ file: image }, {}, (err) => {
        if (err) reject(err);
        if (uploadedFiles.length === images.length) {
          resolve(uploadedFiles);
        }
      });
    });
  });
};

module.exports = uploadImages;
