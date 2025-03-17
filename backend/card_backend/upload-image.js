const express = require("express");
const router = new express.Router();
const multer = require("multer");
const connection = require("../databse");
let fileCounter = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },

  filename: function (req, file, cb) {
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const ext = file.originalname.split(".").pop(); // Extract file extension
    const index = fileCounter++;
    cb(null, `image_${date}_${index}.${ext}`);
  },
});
const upload = multer({ storage: storage }).array("images", 10);

router.post("/image", upload, (req, res) => {
  let name = req.body.name;
  let imageLocations = req.files.map((file) => file.path);
  let tableCreateQuery = `CREATE TABLE IF NOT EXISTS ${name}IMAGE (
  serial_number INT AUTO_INCREMENT,
  imageLocation VARCHAR(250) ,
  PRIMARY KEY(serial_number)
  )`;
  const promise1 = new Promise(function (resolve, reject) {
    connection.query(tableCreateQuery, (error, results) => {
      if (error) {
        console.log("the tableQuery is - ", tableCreateQuery);
        reject(new Error("the table for that name is not created"));
      } else {
        resolve(54);
      }
    });
  });

  promise1
    .then(() => {
      let insertQuery = `INSERT INTO ${name}IMAGE (imageLocation) VALUES ?`;
      connection.query(
        insertQuery,
        [imageLocations.map((path) => [path])],
        (insertError) => {
          if (insertError) {
            return res.json({
              success: false,
              message: "Data insertion failed",
            });
          }
          return res.json({
            success: true,
            message: "Table created and images inserted successfully",
          });
        }
      );
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: "the table is not created OR data is not inserted inside it",
        error: error,
      });
    });
});
module.exports = { router };
