const connection = require("./databse");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const signup = router.post("/signup", async (req, res) => {
  //  AGENT_ID	AGENT_NAME	PHONE_NUMBER	AGENT_EMAIL
  const { agentId, agentName, phoneNumber, agentEmail, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlQuery = `INSERT INTO agents (AGENT_ID,	AGENT_NAME,	PHONE_NUMBER,	AGENT_EMAIL,password) VALUES(?,?,?,?,?)`;
  const sqlQuery2 = `SELECT * FROM agents WHERE PHONE_NUMBER=?`;
  connection.query(sqlQuery2, [phoneNumber], (error, results) => {
    if (error) {
      console.log("faced an error in query 2");
    } else {
      if (results.length > 0) {
        console.log("I am here right now");
        let agentId = results[0].AGENT_ID;
        let agentName = results[0].AGENT_NAME;
        console.log(
          "Id of the matched result is -",
          agentId,
          "name of the matched result is - ",
          agentName,
          "These are already signup"
        );
        res.status(500).send({
          message: "already have this ID",
        });
      } else {
        connection.query(
          sqlQuery,
          [agentId, agentName, phoneNumber, agentEmail, hashedPassword],
          (error, results) => {
            if (error) {
              res.status(500).json({
                message: "signUp is not happening properly",
                why: error,
              });
            } else {
              res.status(201).json({
                message: "Great sign up is done ",
                data: {
                  YourId: agentId,
                  Email: agentEmail,
                  Name: agentName,
                },
                result: results.insertId,
              });
            }
          }
        );
      }
    }
  });
});

module.exports = {
  signup,
};
