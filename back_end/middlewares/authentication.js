let User = require("../models/user.model");
let Task = require("../models/task.model");

// Middleware for authenticating requests with the bearer token.
var authenticateToken = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    User.findOne({ token: token }, (err, user) => {
        if (err) res.status(400).json("Error: " + err);
        else {
            if(user != null){
                res.locals.token = token;
                res.locals.user = user;
                next()
            }
            else {
                res.status(401).json("Request requires authentication.");
            }
        }
    })
  }

  module.exports = authenticateToken