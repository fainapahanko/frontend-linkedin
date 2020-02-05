import React from "react";
import { Modal } from "reactstrap";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import "../index.css";
import Api from "../API";
import { connect } from "react-redux";

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    addCurrentUser: user => dispatch({
        type: "ADD_CURRENT_USER",
        payload: user
    })
})
class ProfileModal extends React.Component {

    state = {
        profile: ''
    }

    componentDidMount = () => {
      this.setState({profile: this.props.profile})
    }

    updateObj = (ev) => {
        this.setState({
            profile: {...this.state.profile,[ev.target.id]: ev.target.value}
        })
    }

    handleSubmit = async(event) => {
      event.preventDefault()
      const {_id} = JSON.parse(JSON.stringify(this.props.profile));
      let resp = await Api.fetch('/profile/' + _id, 'PUT', JSON.stringify(this.state.profile))
      if(resp) {
        this.props.addCurrentUser(this.state.profile)
      }
      this.props.setModal()
    }
  render() {
    return (
      <>
        <Modal isOpen={this.props.open}>
          <div>
            <div className="edit-profile-text">Edit Profile</div>
          </div>
          <div className="modal-div">
            <div className="flex md-4 mr-5">
              <img
                className="modal-bg"
                src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg"
                alt="linkedIn background"
              ></img>
            </div>
            <img
              src={this.props.profile.image}
              className="modal-img"
              alt="profile pic"
            />
            <Form className="update-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="examplePassword">Bio</Label>
                <Input
                  type="text"
                  onChange={this.updateObj}
                  name="password"
                  id="bio"
                  placeholder={this.props.profile.bio}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  onChange={this.updateObj}
                  name="email"
                  id="email"
                  placeholder={this.props.profile.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Area</Label>
                <Input
                  type="text"
                  onChange={this.updateObj}
                  name="password"
                  id="area"
                  placeholder={this.props.profile.area}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Title</Label>
                <Input
                  type="text"
                  onChange={this.updateObj}
                  name="password"
                  id="title"
                  placeholder={this.props.profile.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">ImageUrl</Label>
                <Input
                  type="text"
                  onChange={this.updateObj}
                  name="password"
                  id="image"
                  placeholder={this.props.profile.image}
                />
              </FormGroup>
              <Input
                id="submitBtn"
                type="submit"
                class="btn btn-success mb-5"
                value="SAVE"
              />
              <Input
                style={{width: "150px", textAlign: "center"}}
                class="btn btn-success"
                onClick={this.props.setModal}
                value="EXIT"
              />
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
