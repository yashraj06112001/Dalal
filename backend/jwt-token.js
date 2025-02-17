const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const secretKey = process.env.secretKey;

//verify function
const verifyJwtToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token missing or invalid format" });
  }

  const token = bearerHeader.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  req.token = token;
  next();
};
router.get("/verify", verifyJwtToken, (req, res) => {
  console.log("the jwt header is -", req.headers);
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Token is not valid" });
    } else {
      return res.status(200).json({
        message: "JWT verified",
        authData,
      });
    }
  });
});

module.exports = {
  verifyJwtToken,
  router,
};
