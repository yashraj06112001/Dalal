const express = require("express");
const router = new express.Router();
const multer = require("multer");
const connection = require("../databse");
const path = require("path");
// we have created a storage here
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./video");
  },
  filename: function (req, file, cb) {
    let fileName =
      file.originalname.replace(/\.[^/.]+$/, "") +
      "_video" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});
// storage is done

const upload = multer({ storage: storage }).single("video");

// create an API for uploading video inside a video table

router.post("/video", upload, (req, res) => {
  const location = req.file.path;
  console.log("The location is = ", location);
  let name = req.body.name;
  console.log("the name is = ", name);
  let queryToInsert = `INSERT INTO video (name,video)
  VALUES
('${name}','${location}')`;
  connection.query(queryToInsert, (error, result) => {
    if (error) {
      res.json({
        success: false,
        message: "FAILED TO SEND VIDEO TO THE TABLE",
      });
    } else {
      res.json({
        success: true,
        message: "video is uploaded",
      });
    }
  });
});
module.exports = {
  router,
};
