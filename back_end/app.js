const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")


require("dotenv").config();

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true,});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Atlas database connected.")
})

const tasksRouter = require("./routes/tasks")
const usersRouter = require("./routes/users")
const projectsRouter = require("./routes/projects")

app.use("/tasks",tasksRouter)
app.use("/users",usersRouter)
app.use("/projects",projectsRouter)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
module.exports = app;