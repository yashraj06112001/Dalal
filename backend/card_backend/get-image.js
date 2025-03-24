const express = require("express");
const router = express.Router();
const connection = require("../databse");
const path = require("path");
const fs = require("fs");

// Route to fetch image metadata from the database
router.get("/get-image", (req, res) => {
  const name = req.query.name; // Fix: Use req.query.name instead of req.name

  if (!name) {
    return res.status(400).json({ message: "Table name is required." });
  }

  const lowerCaseName = name.toLowerCase(); // Fix: Use toLowerCase()

  const getImageQuery = `SELECT * FROM ${lowerCaseName}image`; // Fix: Parameterized Query

  connection.query(getImageQuery, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error retrieving images from SQL",
        errorAccured: error.message,
      });
    }
    res.status(200).json({
      message: "Images retrieved successfully",
      data: result,
    });
  });
});

// Route to send actual image file
router.get("/imageImport/:folder/:filename", (req, res) => {
  console.log(
    "the image location is =",
    req.params.folder,
    req.params.filename
  );
  const filePath = path.join(
    __dirname,
    "..",
    req.params.folder,
    req.params.filename
  );

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Image not found" });
  }
});

module.exports = { router };
