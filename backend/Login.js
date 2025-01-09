const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const connection = require("./databse");

app.use(bodyParser.json());

const loginRecord = router.post("/login", async (req, res) => {
  const { customerId, password, dateAndTime } = req.body;
  console.log("the request we are getting is - ", req);
  console.log(customerId, password, dateAndTime);
});

module.exports = {
  loginRecord,
};
