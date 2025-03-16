const express = require("express");
const router = new express.Router();
const connection = require("../databse");

router.get("/getInfo", (req, res) => {
  let queryToGetTotalInfo = "SELECT * FROM cards";
  connection.query(queryToGetTotalInfo, (err, result) => {
    if (err) {
      res.json({
        message: "No data found from cards",
      });
    } else {
      res.json({
        data: result,
      });
    }
  });
});
module.exports = {
  router,
};
