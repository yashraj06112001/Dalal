const express = require("express");
const router = express.Router();
const connection = require("./databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRecord = router.post("/login", async (req, res) => {
  try {
    const { customerId, password, dateAndTime } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sqlQuery1 = `INSERT INTO login (customerId, Password, dataAndTime) VALUES (?, ?, ?)`;
    //INSERTED DATA IN ONE COLUMN CONSIST OF ALL TRIALS OF LOGIN
    connection.query(
      sqlQuery1,
      [customerId, hashedPassword, dateAndTime],
      (error, results) => {
        if (error) {
          console.error("Error inserting data:", error);
          return res.status(500).json({ message: "Database error" });
        } else {
          let user = {
            id: customerId,
            pass: password,
          };
          jwt.sign(
            { user },
            secretKey,
            { expiresIn: "3000s" },
            (err, token) => {
              if (err) {
                res.status(500).json({
                  message: "the JWT token is not initilized correctly",
                });
              }
            }
          );
        }
        res.status(201).json({
          message: "Login record inserted successfully",
          recordId: results.insertId,
        });
      }
    );
  } catch (err) {
    console.log("we are facing error in login the values", err);
  }
});

module.exports = {
  loginRecord,
};
