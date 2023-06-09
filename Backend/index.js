import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "9ahsyjv8eeu9";
const api_secret =
  "nptwjrddfwfgxzqm8svuzns3cp887ks8f9e5megek3bms993r2bfvr6a68k4bz22";
const serverClient = StreamChat.getInstance(api_key, api_secret);

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res
      .status(200)
      .send({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found !" });
    console.log(users[0]);
    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.status(200).send({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    console.log("error");
    res.status(400).send({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
