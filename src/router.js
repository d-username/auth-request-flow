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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const payload = mockUser.username;
  const token = jwt.sign(payload, process.env.JWT_SECRET);

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
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ profile });
  } catch (err) {
    res.status(400).json({ error: "Bad request made." });
  }
});

module.exports = router;
