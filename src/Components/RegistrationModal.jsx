import React, {Component} from 'react';
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../API';
import { connect } from 'react-redux';

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setUser: (id) => dispatch({
        type: "ADD_CURRENT_USER",
        payload: id
    })
})

class RegistrationModal extends Component {
    state = {
        user: {}
    }
    register = async(e) => {
        e.preventDefault()
        let resp = await Api.fetch("/users/", "POST", JSON.stringify(this.state.user), 'application/json')
        this.props.setUser(resp)
        this.props.setModal()
    }

    updateForm = (e) => {
        this.setState({
            user: {...this.state.user, [e.target.id]: e.target.value}
        });
        sessionStorage.setItem(e.target.id, e.target.value);
    };

    render() {
        return (
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>Register</ModalHeader>
                    <ModalBody>
                        <Form className="form">
                            <Row form>
                                <div className="form-group">
                                    <label>NAME</label>
                                    <input type="text" className="form-control" id="name"
                                           placeholder="" onChange={this.updateForm} />
                                </div>
                            </Row>
                            <Row form>
                                <div className="form-group">
                                    <label>SURNAME</label>
                                    <input type="text" className="form-control" id="surname"
                                           placeholder="" onChange={this.updateForm} />
                                </div>
                            </Row>
                            <Row form>
                                <div className="form-group">
                                    <label>EMAIL</label>
                                    <input type="email" className="form-control" id="email"
                                           placeholder="" onChange={this.updateForm} />
                                </div>
                            </Row>
                            <Row form>
                                <div className="form-group">
                                    <label>USERNAME</label>
                                    <input type="text" className="form-control" id="username"
                                           placeholder="" onChange={this.updateForm} />
                                </div>
                            </Row>
                            <Row form>
                                <div className="form-group">
                                    <label>PASSWORD</label>
                                    <input type="password" className="form-control" id="password"
                                           placeholder="" onChange={this.updateForm}/>
                                </div>
                            </Row>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.register} color='primary'>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationModal);
