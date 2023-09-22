//require jwt token
const jwt = require('jsonwebtoken');

//set token secret
const secret = "freshfoood";

//set expiry period
const expiration = "1h";


//function authMiddleware for routes allows token to be sent via req.query or headers
module.exports = { 
    authMiddleware: function (req, res, next) {
        let token = req.query.token || req.headers.authorization;

        //Token bearer & token value
        if (req.headers.authorization) {
            token = token.split('').pop().trim();
        }
        if(!token) {
            return res.status(400).json({message: "You have no token"});
        }

        //verify token and get user data out of it
        try {
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
        }catch {
            console.log('Invalid Token');
            return res.status(400).json ({message: "Invalid Token"});
        }

        //send to next endpoint
        next();
    },
    
};