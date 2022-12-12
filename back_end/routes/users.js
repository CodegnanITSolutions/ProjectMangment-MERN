const router = require("express").Router()

let User = require("../models/user.model");



// Not secure and is only here for testing purposes.
router.route("/").get((req, res) => {
    User.find({},'_id username').then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
});

// Register a new user.
router.route("/create").post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    let newUser = new User({ username, email })
    newUser.setPassword(password)
    newUser.updateToken();
    newUser.save().then(() => { res.json("User created sucessfully.") })
        .catch(err => res.status(400).json("Error: " + err))
});

// Logins a user and returns his authtoken.
router.route("/login").post((req, res) => {
    let name = req.body.username;
    let password = req.body.password;
    let user = User.findOne({ username: name }, (err, user) => {
        if (err) res.status(400).json("Error: " + err);
        else {
            if(user != null){
                if (user.validPassword(password)) {
                    let tk = user.updateToken();
                    user.save().then(() => {res.send({user:user.username,token: tk });})
                    .catch(err => res.status(400).json("Error: " + err))
                }
                else {
                    res.status(400).json("Authentication error.");
                }
            }
            else {
                res.status(400).json("Authentication error.");
            }
        }
    })

});



module.exports = router