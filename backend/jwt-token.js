const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
secretKey = "SECRETKEY";
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
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "token is not valid",
    });
  }
};

module.exports = {
  verifyJwtToken,
};
