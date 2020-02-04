import React, { Component } from "react";
import { Button, Form, Label, Input, Row, Col } from "reactstrap";
import RegistrationModal from './RegistrationModal'
import ErrorMessage from './ErrorMessage'
import Api from "../API";
import { connect } from "react-redux";
import '../main.css'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    addCurrentUser: user => dispatch({
        type: "ADD_CURRENT_USER",
        payload: user
    })
})

class Login extends Component {
  state = {
    user: {},
    error: false,
    isOpen: false
  };

  setModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  handleChange = e => {
    this.setState({
        user: {...this.state.user, [e.target.id]: e.target.value}
    });
    sessionStorage.setItem(e.target.id, e.target.value);
  };

  login = async() => {
    let response = await Api.fetch("/login", 'POST', JSON.stringify(this.state.user), 'application/json')
    if (response) {
      this.props.addCurrentUser(response)
      // this.props.handleLogin();
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="main-div-login">
        <Form inline>
          <Row className="mb-2">
            <Col md="4">
              <Label className="label-login-style" >Login</Label>
            </Col>
            <Col md="8">
              <Input
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="don't tell!"
              />
            </Col>
          </Row>
        </Form>
        <div className="div-btn-login">
          <Button className="mr-3 btn-login" onClick={this.login}>
            Submit
          </Button>
          <Button className="btn-login" onClick={this.setModal}>
            Registration
          </Button>
          {this.state.isOpen && <RegistrationModal  isOpen={this.state.isOpen} handleLogin={this.props.handleLogin}  setModal={this.setModal} />}
        </div>
        <div>
          {this.state.error && <ErrorMessage style={{height: "70px", fontSize: "12px"}} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
