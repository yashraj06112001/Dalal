const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dalal",
  password: "1",
  port: "5432",
});

app.use(bodyParser.json());

const loginRecord = router.post("/login", async (req, res) => {
  const data = req.body;
  customer_id = data.customerId;
  password = data.password;
  dataAndTime = data.dateTime;

  const query = ` INSERT INTO customers (customer_id, password, date_and_time)
      VALUES ($1, $2, $3)
      RETURNING serial_number;`;

  try {
    const result = await pool.query(query, [customer_id, dataAndTime]);
    res.status(201).json({
      message: "Customer inserted successfully",
      serial_number: result.rows[0].serial_number,
    });
  } catch (error) {
    console.log("the error I am getting here is - ", error);
  }
});

module.exports = {
  loginRecord,
};
