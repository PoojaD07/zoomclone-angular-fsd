const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../Model");
const Employee = db.employees;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret,{ expiresIn: 10 }, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
  };
module.exports = authJwt;
