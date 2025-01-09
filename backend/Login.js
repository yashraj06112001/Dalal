const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const connection = require("./databse");
const bycrypt = require("bycrypt");

const loginRecord = router.post("/login", async (req, res) => {
  try {
    const { customerId, password, dateAndTime } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlQuery = `INSERT INTO login (customerId, Password, dateAndTime) VALUES (?, ?, ?)`;
    connection.query(
      sqlQuery,
      [customerId, hashedPassword, dateAndTime],
      (error, results) => {
        if (error) {
          console.error("Error inserting data:", error);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({
          message: "Login record inserted successfully",
          recordId: results.insertId,
        });
      }
    );
  } catch (err) {
    console.log("we are facing error in login the values");
  }
});

module.exports = {
  loginRecord,
};
