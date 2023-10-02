//require jwt token
const jwt = require("jsonwebtoken");

//set token secret
const secret = "freshfoood";

//set expiry period
const expiration = "1h";

//function authMiddleware for routes allows token to be sent via req.query or headers
module.exports = {
  authMiddleware: function ({ req }) {
    // console.log(req);
    let token =
      (req.query && req.query.token) ||
      (req.headers && req.headers.authorization);

    if (!token) {
      return req;
    }
    //Token bearer & token value
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      // return res.status(400).json({message: "You have no token"});
    }

    //verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data);
      req.user = data;
    } catch {
      console.log("Invalid Token");
      // return res.status(400).json ({message: "Invalid Token"});
    }
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
