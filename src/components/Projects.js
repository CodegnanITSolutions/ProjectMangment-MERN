import React, { Component } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectInfo from "./ProjectInfo"
// Components
import { Form, Button, Row, Col } from 'react-bootstrap';

class Projects extends Component {
    constructor(props) {
        super(props)

        this.onChangeProjectName = this.onChangeProjectName.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.getProjects = this.getProjects.bind(this);

        this.state = {
            projectName: "",
            projects: []
        }
    }
    onSubmit(event) {
        event.preventDefault()
        let projectName = this.state.projectName;
        this.setState({projectName:""})
        let token = localStorage.getItem("token");
        axios.post("http://localhost:5000/projects/new",
            {projectName: projectName },
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                this.getProjects();

            }).catch((err) => {
                console.log(err)
                console.error("Could not create project.")
            });
    }
    onChangeProjectName(e) {
        this.setState({ projectName: e.target.value })
    }
    getProjects() {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:5000/projects",  {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            this.setState({ projects: res.data })

        }).catch((err) => {
            console.log(err)
            console.error("Could not get projects.")
        });
    }
    componentDidMount() {
        this.getProjects();
    }
    render() {

        let halfWayThough = Math.floor(this.state.projects.length / 2)

        let leftColumn = this.state.projects.slice(0, halfWayThough);
        let rightColumn = this.state.projects.slice(halfWayThough, this.state.projects.length);

        const leftProjects = leftColumn.map((project, key) =>
            <ProjectInfo key={project._id} project={project} getProjects={this.getProjects}></ProjectInfo>
        );

        const rightProjects = rightColumn.map((project, key) =>
            <ProjectInfo key={project._id} project={project} getProjects={this.getProjects}></ProjectInfo>
        );
        const style = {
            backgroundColor: "#a2c8ec",
            padding: "20px",
            margin: "25px",

        };
        return (
            <Row>
                <Col>
                    {leftProjects}

                </Col>
                <Col>
                    {rightProjects}
                </Col>
                <Col>
                    <Form style={style} onSubmit={this.onSubmit}>
                        <h1>Create a new Project</h1>
                        <Form.Group controlId="formProjectName" >
                            <Form.Label>Your project name</Form.Label>
                            <Form.Control type="text" placeholder="Enter project name" value={this.state.projectName} onChange={this.onChangeProjectName} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Project
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Projects;
