const connection = require("./databse");
const router = express.Router();

const signup = router.post("/signup", (req, res) => {
  //  AGENT_ID	AGENT_NAME	PHONE_NUMBER	AGENT_EMAIL
  const { agentId, agentName, phoneNumber, agentEmail } = req.body;
  const sqlQuery = `INSERT INTO agents (AGENT_ID,	AGENT_NAME,	PHONE_NUMBER,	AGENT_EMAIL) VALUES(?,?,?,?)`;
  connection.query(
    sqlQuery,
    [agentId, agentName, phoneNumber, agentEmail],
    (error, results) => {
      if (error) {
        res.status(500).json({
          message: "signUp is not happening properly",
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
});
