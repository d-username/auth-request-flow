const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

const secret = "Just_a_secret_key";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const payload = mockUser.username;
  const token = jwt.sign(payload, secret);

  if (username === mockUser.username && password === mockUser.password) {
    res.json({ token });
  }
  if (username !== mockUser.username || password !== mockUser.password) {
    res.status(400).json({ error: "Credentials not matching." });
  }
});

router.get("/profile", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const profile = mockUser.profile;

  try {
    const payload = jwt.verify(token, secret);
    res.json({ profile });
  } catch (err) {
    res.status(400).json({ error: "Bad request made." });
  }
});

module.exports = router;
