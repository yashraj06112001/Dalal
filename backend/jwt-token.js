const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const secretKey = process.env.secretKey;

//definition
router.post("/jwt", (req, res) => {
  const { user } = req.body;
  jwt.sign({ user }, secretKey, { expiresIn: "3000s" }, (err, token) => {
    res.json({ token });
  });
});

//verify function
const verifyJwtToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) {
      return res.status(403).json({ message: "Token missing" });
    }
    req.token = token;
    next();
  } else {
    res.status(403).json({ message: "Token is not valid" });
  }
};

const frontEndVerficationToken = router.get(
  "/verify",
  verifyJwtToken,
  (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
      if (err) {
        res.status(403);
      } else {
        return res.status(201).json({
          message: "JWT verified",
          authData,
        });
      }
    });
  }
);

module.exports = {
  verifyJwtToken,
  frontEndVerficationToken,
};
