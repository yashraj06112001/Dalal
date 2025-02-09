const express = require("express");
const router = express.Router();
const connection = require("./databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.secretKey;

const loginRecord = router.post("/login", async (req, res) => {
  try {
    const { customerId, password, dateAndTime } = req.body;
    // LETS CHECK IS THE PASSWORD RIGHT OR NOT
    const sqlQueryCheck = `SELECT password FROM agents WHERE AGENT_NAME = ?`;
    connection.query(sqlQueryCheck, [customerId], async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "There is slight problem with the checking sql query",
        });
      }
      if (results.length == 0) {
        return res.status(404).json({
          message: `There is no customer with name ${customerId} `,
        });
      }
      let checkPassword = results[0].password;
      const isMatch = await bcrypt.compare(password, checkPassword);
      if (!isMatch) {
        return res.status(401).json({
          message: "the login failed as Password is wrong",
        });
      }
      //INSERTED DATA IN ONE COLUMN CONSIST OF ALL TRIALS OF LOGIN
      //const hashedPassword = await bcrypt.hash(password, 10);
      const sqlQuery1 = `INSERT INTO login (customerId, Password, dataAndTime) VALUES (?, ?, ?)`;
      connection.query(
        sqlQuery1,
        [customerId, checkPassword, dateAndTime],
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
                } else {
                  res.status(201).json({
                    message: "Login record inserted successfully",
                    recordId: results.insertId,
                    jwtToken: token,
                  });
                }
              }
            );
          }
        }
      );
    });
  } catch (err) {
    console.log("we are facing error in login the values", err);
  }
});

module.exports = {
  loginRecord,
};
