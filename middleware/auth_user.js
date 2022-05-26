const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("access_token");
  if (!token) return res.status(401).send("Access Denied No Token");

  try {
    const decoded = jwt.verify(token, "sameer");
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("invalid token");
  }
};