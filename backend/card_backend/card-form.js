const express = require("express");
const router = express.Router();
const { uploadVideo, saveImage } = require("./card");
const connection = require("../databse");
const multer = require("multer");

router.post("/card/image", async (req, res) => {
  try {
    const filenames = await saveImage(req);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  const userId = req.body.name; // Assuming name is the user_id
  // added in the main file
  req.files.forEach((file) => {
    const imageName = file.filename;
    const imageUrl = `image/${imageName}`;
    const query =
      "INSERT INTO image (user_id, image_name, image_url) VALUES (?, ?, ?)";
    connection.query(query, [userId, imageName, imageUrl], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Database error" });
      }
    });
  });
  res
    .status(200)
    .json({ success: true, message: "Images uploaded successfully" });
});

router.post("card/video", uploadVideo.single("video"), (req, res) => {
  // Upload of rest of the things
  if (!req.file) {
    return res.status(400).json({ message: "No video uploaded" });
  }
  const { name, color, description, price } = req.body;
  const videoUrl = req.file ? `video/${req.file.filename}` : null; // Ensure video path is correct

  const query2 =
    "INSERT INTO cards(name, color, description, video, price) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    query2,
    [name, color, description, videoUrl, price],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Data uploaded successfully" });
    }
  );
});
module.exports = { router };
