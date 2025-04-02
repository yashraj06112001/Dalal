const express = require("express");
const router = express.Router();
const connection = require("../databse");
const path = require("path");
const fs = require("fs");
// here we have the api for getting the video currently
router.get("/get-video", (req, res) => {
  let name = req.query.name;
  if (!name) {
    return res.status(400).json({ message: "Table name is required." });
  }

  let lowerCaseName = name.toLowerCase();
  let getVideoQuery = `SELECT video FROM video
  where name="${lowerCaseName}"`;
  connection.query(getVideoQuery, (error, result) => {
    if (error) {
      return res.json({
        message: "Error in loading video for the Popup",
        error: error,
      });
    }
    res.json({
      message: "The video is retrieved",
      data: result,
    });
  });
});
//lets make an API for sending this video from one place to another
router.get("/videoImport/:file", (req, res) => {
  console.log("entered inside the video Import");
  const fileName = req.params?.file;
  const filePath = path.join(__dirname, "..", "video", req.params?.file);
  console.log("Looking for file at:", filePath); // Debugging output
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Video  not found" });
  }
});

module.exports = {
  router,
};
