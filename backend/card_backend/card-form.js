const express = require("express");
const router = express.Router();
const upload = require("./card");

const cardUploader = router.post(
  "/card",
  upload.single("video"),
  (req, res) => {
    const cardData = req.body;
  }
);
