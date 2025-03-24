const express = require("express");
const router = new express.Router();
const multer = require("multer");
const connection = require("../databse");
const { Result } = require("postcss");

router.post("/info", (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let color = req.body.color;
  let price = req.body.price;
  console.log(
    "the data of all parameters are - ",
    name,
    color,
    price,
    description
  );
  const query = `INSERT INTO cards(name, color, description, price)
  VALUES
 ('${name}','${color}','${description}','${price}')`;
  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.json({
        success: false,
        message: "This is an error message for info table insertion",
        error: error,
      });
    } else {
      res.json({
        success: true,
        message: "Info has been added in the cards table of database",
      });
    }
  });
});

module.exports = {
  router,
};
