const express = require("express");
const router = express.Router();
const connection = require("../databse");
const multer = require("multer");
const path = require("path");

// 🔹 Ensure the "image/" folder exists
const IMAGE_FOLDER = path.join(__dirname, "../image");

// 🟢 Multer Storage Configuration (only handles files, no req.body yet)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_FOLDER); // Save images inside "image/" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage }).array("images"); // Accept multiple images

// 🔹 Function to Save Image Data in MySQL
const saveImages = (userId, files) => {
  return new Promise((resolve, reject) => {
    if (!userId || !files || files.length === 0) {
      return reject("Invalid data");
    }

    const values = files.map((file, index) => [
      userId,
      `image_${index + 1}`, // Image name as image_1, image_2...
      `image/${file.filename}`, // Image URL path
    ]);

    const query = "INSERT INTO image (user_id, image_name, image_url) VALUES ?";

    connection.query(query, [values], (err) => {
      if (err) {
        console.error("Database error:", err);
        return reject("Database error");
      }
      resolve("Images uploaded successfully");
    });
  });
};

// 🟢 API to Handle Image Upload
router.post("/upload/images", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(500)
        .json({ success: false, message: "File upload error" });
    }

    const { user_id } = req.body; // Extract user_id after multer runs

    if (!user_id || !req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    try {
      const message = await saveImages(user_id, req.files);
      res.status(200).json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  });
});

module.exports = { router };
