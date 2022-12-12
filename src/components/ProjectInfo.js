import React, { Component } from 'react';
import moment from "moment"
import axios from "axios"
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/fontawesome-free-solid'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Tooltip, Form, InputGroup, FormControl, OverlayTrigger,Row,Col} from 'react-bootstrap';

class ProjectInfo extends Component {
    constructor(props) {
        super(props)

        this.submitTask = this.submitTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.removeProject = this.removeProject.bind(this);
        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);

        this.state = {
            newTaskDescription: ""
        }
    }
    onChangeTaskDescription(e) {
        this.setState({ newTaskDescription: e.target.value })
    }
    submitTask(event) {
        let description = this.state.newTaskDescription;
        this.setState({ newTaskDescription: "" });
        let token = localStorage.getItem("token");
        axios.post("http://127.0.0.1:5000/tasks/create",
            { description: description, projectId: this.props.project._id },
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (res.status === 200) this.props.getProjects();

            }).catch((err) => {
                console.log(err)
                console.error("Could not create project.")
            });
    }

    completeTask(event) {
        let taskId = event.target.id;
        let token = localStorage.getItem("token");
        axios.post("http://127.0.0.1:5000/tasks/" + taskId + "/complete",
            {},
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (res.status === 200) this.props.getProjects();

            }).catch((err) => {
                console.log(err)
                console.error("Could not complete task.")
            });
    }
    removeTask(event) {
        let taskId = event.currentTarget.id;
        let token = localStorage.getItem("token");
        axios.delete("http://127.0.0.1:5000/tasks/" + taskId + "/delete",
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (res.status === 200) this.props.getProjects();

            }).catch((err) => {
                console.log(err)
                console.error("Could not delete task.")
            });
    }
    removeProject(event) {
        let projectId = event.currentTarget.id;
        let token = localStorage.getItem("token");
        axios.delete("http://127.0.0.1:5000/projects/" + projectId + "/delete",
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (res.status === 200) this.props.getProjects();

            }).catch((err) => {
                console.log(err)
                console.error("Could not delete project.")
            });
    }
    render() {
        const style = {
            backgroundColor: "#dae9f7",
            width: '25rem',
            margin: "25px",
            textAlign: "left"
        };

        const completedStyle = {
            color: 'grey',
            textDecorationLine: 'line-through',
            display: "inline-block",
            marginRight: "50px"
        };

        let completedTasks = [], ongoingTasks = [];
        for (let task of this.props.project.tasks) {
            if (task.completed) completedTasks.push(task)
            else ongoingTasks.push(task);
        }

        const renderCompletedTasks = completedTasks.map((task, key) =>
            <OverlayTrigger key={task._id} placement={"right"}
                overlay={
                    <Tooltip id={`tooltip-${"right"}`} >
                        Finished on {moment(task.completionDate).format('YYYY-DD-MM')}.
                    </Tooltip>
                }>
                <p key={task._id} style={completedStyle} >{task.description}</p>
            </OverlayTrigger>

        );

        const renderOngoingTasks = ongoingTasks.map((task, key) =>
            <div key={task._id} style={{ marginBottom: "15px" }}>
                <Form.Check id={task._id} key={task._id} type="checkbox" label={task.description} onChange={this.completeTask} style={{ display: "inline-block", marginRight: "20px" }} />
                <Button id={task._id} variant="outline-danger" size="sm" onClick={this.removeTask} style={{ float: "right" }}> <FontAwesomeIcon id={task._id} color="red" icon="times" />  </Button>
            </div>
        );

        return (
            <Card style={style}>
                <Card.Body>
                    <Row>
                        <Col xs={10}>  <Card.Title >{this.props.project.name}</Card.Title></Col>
                        <Col xs={2}>  <Button id={this.props.project._id} onClick={this.removeProject} variant="outline-danger" size="sm" style={{ float: "right" }}><FontAwesomeIcon color="red" icon="trash-alt" /></Button></Col>
                    </Row>

                   
                    <Card.Text>
                        {this.props.project.description}
                    </Card.Text>
                    <h6>Active tasks: </h6>
                    <Form.Group controlId="activeTasks">
                        {renderOngoingTasks}
                    </Form.Group>

                    <h6>Completed tasks: </h6>
                    <div style={completedStyle}>
                        {renderCompletedTasks}
                    </div>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="New task description" aria-label="New task description" aria-describedby="basic-addon2" value={this.state.newTaskDescription} onChange={this.onChangeTaskDescription} />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.submitTask}>Add task</Button>
                        </InputGroup.Append>
                    </InputGroup>

                </Card.Body>
            </Card>
        );
    }
}

export default ProjectInfo;
