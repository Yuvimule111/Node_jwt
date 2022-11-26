const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretkye = 'secretKye'

app.get("/", (req, res) => {
  res.json({
    message: "A Simple API",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "Yuviii",
    email: "Yuvrajmule111@gmail.com",
  };
  jwt.sign({ user }, secretkye, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});
app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretkye, (err, authData) => {
    if (err) {
      res.send({ result: "Invalid Token" });
    } else {
      res.json({
        message: "Profile Accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const berare = bearerHeader.split(" ");
    const token = berare[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is not valid",
    });
  }
}

app.listen(5080, () => {
  console.log("App is running on port 5000")});