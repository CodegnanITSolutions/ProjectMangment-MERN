import React, { Component } from 'react';
import axios from  "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Form, Button, Row, Col } from 'react-bootstrap';

class LoginUser extends Component {
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: ""
        }

    }
    onSubmit(event){
        event.preventDefault()
        let login = {
            username : this.state.username,
            password : this.state.password,
        }
        axios.post("http://localhost:5000/users/login",login).then((res)=>{
           let token = res.data.token;
           let username = res.data.user;
           localStorage.setItem("token",token);
           localStorage.setItem("user",username);
           window.location = "/"
         
        }).catch((err)=>{
            console.log(err)
            console.error("Could not login user.")
        });
     
     }
     onChangeUsername(e){
         this.setState({username: e.target.value})
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
                        <Form.Group controlId="formUsername" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="Username" placeholder="Enter username" value={this.state.username} onChange={this.onChangeUsername} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        );
    }
}

export default LoginUser;
