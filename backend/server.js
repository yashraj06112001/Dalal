const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const { router: loginRecord } = require("./Login");
const { signup } = require("./SIgnUp");
const { router: frontEndVerficationToken } = require("./jwt-token");
const { router: cardUpload } = require("./card_backend/card-form");
app.use(cors());
app.use(express.json());
app.use("/api", loginRecord);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api", cardUpload);
app.use("/api", frontEndVerficationToken);
app.use("/api", signup);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
