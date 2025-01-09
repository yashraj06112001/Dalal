const mySQL = require("mysql2");
const connection = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dalal",
});
connection.connect((err) => {
  if (err) {
    console.log("error is ", err);
  } else {
    console.log("database is connected");
  }
});

module.exports = connection;
