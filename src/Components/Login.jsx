import React, { useState } from "react";
import { Button, Form, Label, Input, Row, Col } from "reactstrap";
// import RegistrationModal from './RegistrationModal'
import {Link} from 'react-router-dom'
import ErrorMessage from './ErrorMessage'
import Api from "../API";
import { connect } from "react-redux";
import '../main.css'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    addCurrentUser: user => dispatch({
        type: "ADD_CURRENT_USER",
        payload: user
    }),
    setToken: token => dispatch({
      type: "ADD_TOKEN",
      payload: token
    })
})

const  Login = (props) => {
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [error, setError] = useState(false)

  const getMyProfile = async(token) => {
    let resp = await fetch('http://localhost:3433/profile/me', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      }
    })
    if(resp.ok) {
      let currentUser = await resp.json()
      props.addCurrentUser(currentUser)
      props.setToken(token)
    } else {
      setError(true)
      console.log('loch')
    }
  }

   const login = async() => {
    const credentials = {
      username: username,
      password: password
    }
    const resp = await fetch('http://localhost:3433/users/signin', {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(resp)
    if(resp.ok){
      let access_token = await resp.json()
      console.log(access_token)
      localStorage.setItem('token', access_token.token)
      localStorage.setItem('username', username)
      getMyProfile(access_token.token)
    }
    else {
      setError(true)
    }
  }
    return (
      <div className="main-div-login">
        <Form inline>
          <Row className="mb-2">
            <Col md="4">
              <Label className="label-login-style" >Login</Label>
            </Col>
            <Col md="8">
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="email"
                id="username"
                placeholder="user420"
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md="4">
              <Label className="label-login-style">Password</Label>
            </Col>
            <Col md="8">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="don't tell!"
              />
            </Col>
          </Row>
        </Form>
        <div className="div-btn-login">
          <Button className="mr-3 btn-login" onClick={login}>
            Submit
          </Button>
          <Link to="/register">
            <Button className="mr-3 btn-login">
              Join us now
            </Button>
          </Link>
          <a href="http://localhost:3433/auth/facebook"><Button className="mt-3" color="info">Login With Facebook</Button></a>
        </div>
        <div>
          {error && <ErrorMessage style={{height: "70px", fontSize: "12px"}} />}
        </div>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
