const router = require("express").Router()
let User = require("../models/user.model");
let Project = require("../models/project.model");
let Task = require("../models/task.model");
var authenticateToken = require("../middlewares/authentication")

// Refactor back into GET with the token as a Bearer.
router.route("/").get(authenticateToken,(req, res) => {
    User.findOne({token:res.locals.token}) // all
    .populate({ path: "projects", populate: { path: 'tasks' } })
    .exec(function (err, user) {
        if (err) res.status(400).json("Error: " + err);
        else {
            res.json(user.projects) 
        }
  });
});

router.route("/:id/delete").delete(authenticateToken, (req, res) => {
    let projectId = req.params.id;
    Project.deleteOne({ _id: projectId }, function (err) {
        if (err)  res.status(400).json("Error: " + err);
        else res.sendStatus(200)
      });
});



router.route("/new").post(authenticateToken,(req, res) => {
    let projectName = req.body.projectName;
    let project = new Project({name: projectName});
    project.save().then(() => {
        res.locals.user.projects.push(project);
        res.locals.user.save(function(err) {
            if (err) res.status(400).json("Error: " + err);
            res.json("Project created sucessfully.") 
        });
    }).catch(err => res.status(400).json("Error: " + err))
});

router.route("/:projectId/tasks").get(authenticateToken, (req, res) => {
    let parentProjectId = req.params.projectId
    User.findOne({ token: res.locals.token })
    .populate({ path: "projects", match: { _id: parentProjectId }, limit: 1, populate: { path: 'tasks' } }).exec(function (err, user) {
        if (err) res.status(400).json("Error: " + err);
        else {
            let project = user.projects[0];
            console.log(project);
            res.json(project.tasks)
        }
    });
});
module.exports = router