import React, { Component } from 'react';
import axios from  "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Form, Button, Row, Col } from 'react-bootstrap';

class RegisterUser extends Component {
    constructor(props){
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            email: "",
            password: ""
        }

    }
    onSubmit(event){
       event.preventDefault()
       let user = {
           username : this.state.username,
           email : this.state.email,
           password : this.state.password,
       }
       axios.post("http://localhost:5000/users/create",user).then((res)=>{
           window.location = "/";
       }).catch((err)=>{
           console.error("Could not register user.")
       });
    
    }
    onChangeUsername(e){
        this.setState({username: e.target.value})
    }
    onChangeEmail(e){
        this.setState({email: e.target.value})
    }
    onChangePassword(e){
        this.setState({password: e.target.value})
    }
    render() {
        const style = {
            backgroundColor: "#a2c8ec",
            padding: "20px",
            marginTop: "25px",
        };

        return (
            <Row>
                <Col></Col>
                <Col>
                    <Form style={style} onSubmit={this.onSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="Username" placeholder="Enter username" value={this.state.username} onChange={this.onChangeUsername}/>
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        );
    }
}

export default RegisterUser;
