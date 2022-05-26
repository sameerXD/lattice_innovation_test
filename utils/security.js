const jwt = require("jsonwebtoken");

//creating jwt token for logged in users
const generateAuthToken = function (user) {
    const token = jwt.sign({ _id: user.id, _email:user.email }, "sameer");
    return token;
  };

module.exports = {
    generateAuthToken
}