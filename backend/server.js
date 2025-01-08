const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const { loginRecord } = require("./Login");

app.use(cors());
app.use(express.json());
app.use("/api", loginRecord);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
