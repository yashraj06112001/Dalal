const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const { loginRecord } = require("./Login");
const { signup } = require("./SIgnUp");

app.use(cors());
app.use(express.json());
app.use("/api", loginRecord);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api", signup);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
