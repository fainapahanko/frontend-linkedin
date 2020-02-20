import React from 'react';
import Api from '../API'
import {Modal, Form, FormGroup, Label, Input, Button} from "reactstrap";
import {connect} from 'react-redux'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch({
        type:"ADD_CURRENT_USER",
        payload: user
    })
  })

class ExperienceModal extends React.Component {
    state = {
        experience: this.props.experience || {}
    }
    updateObj = (e) => {
        e.preventDefault()
        if(e.target.id === 'image'){
            this.setState({
                file: e.target.files[0]
            })
        } else if (e.target.id === 'tillNow'){
            this.setState({
                experience: Object.assign(this.state.experience,{endDate: new Date()})
            })
        }
        else{
            this.setState({
                experience: Object.assign(this.state.experience,{[e.target.id]: e.target.value})
            })
        }
    }
    handleSubmit = async(e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("experience", this.state.file);
        let expr = this.state.experience
        console.log(expr)
        if(this.props.experience) {
            const formData = new FormData();
            formData.append("experience", this.state.file)
            const {_id} = JSON.parse(JSON.stringify(this.props.experience));
            const post = await Api.fetch('/profile/' + Api.USER + '/experiences/' + _id, "PUT", JSON.stringify(expr)) 
            await Api.fetch('/profile/' + Api.USER + '/experiences/' + post._id + 'picture', "PUT", formData)
        } else {
            // const formData = new FormData();
            // formData.append("experience", this.state.file)
            // console.log(Api.USER)
            // const postResp = await fetch('http://localhost:3433/profile/' + Api.USER + '/experiences', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": "Bearer " + this.props.token,
            //     },
            //     body: JSON.stringify(expr) 
            // })
            // const post = await postResp.json()
            // const resp = await fetch('http://localhost:3433/profile/' + Api.USER + '/experiences/' + post._id + '/picture', {
            //     method: "POST",
            //     headers: {
            //         "Authorization": "Bearer " + this.props.token,
            //     },
            //     body:formData
            // })
            // const updatedUser = await resp.json()
            // console.log(updatedUser)
            const post = await Api.fetch('/profile/' + Api.USER + '/experiences/', "POST", JSON.stringify(expr)) 
            console.log(post)
            const formData = new FormData();
            formData.append("experience", this.state.file)
            const resp = await Api.fetch(`/profile/${Api.USER}/experiences/${post._id}/picture`, "POST", formData)
        }
        this.props.setModal(!this.props.open)
    }
    render() {
        return (
            <>
            <Modal isOpen={this.props.open}> 
            <div className="modal-div">
            <div className="flex md-5 mr-5">
            <img
                className="modal-bg"
                src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg"
                alt="linkedIn background"
            ></img>
            </div>
            <Form className="update-form mt-5" onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label for="examplePassword">Company</Label>
                <Input
                type="text"
                onChange={this.updateObj}
                name="password"
                id="company"
                placeholder="Name of Employer?"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Position</Label>
                <Input
                type="email"
                onChange={this.updateObj}
                name="email"
                id="role"
                placeholder="Your role in company"
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Start Date</Label>
                <Input
                type="date"
                onChange={this.updateObj}
                id="startDate"
                placeholder="Date you started?"
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">End Date</Label>
                <Input
                type="date"
                onChange={this.updateObj}
                id="endDate"
                placeholder="Date you finished(if necessary)?"
                />
            </FormGroup>
            <FormGroup check>
            <Label check>
                <Input id="tillNow" onChange={this.updateObj} type="checkbox" />{' '}
                    Current work position 
                </Label>
            </FormGroup>
            <FormGroup>
                <Label for="description">Duties</Label>
                <Input
                type="text"
                onChange={this.updateObj}
                id="description"
                placeholder="Briefly describe your role"
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Area</Label>
                <Input
                type="text"
                onChange={this.updateObj}
                id="area"
                placeholder="Location of employment"
                />
            </FormGroup>
            <FormGroup>
                <Label for="picture">Picture</Label>
                <Input
                    id='image'
                    type='file'
                    onChange={this.updateObj}
                />
            </FormGroup>
            <Button
                type="submit"
                className="btn btn-info mr-3"
                value="Submit"
                onClick={this.handleSubmit}
            >
                    Submit
             </Button>
            <Button
                className="btn btn-danger"
                value="Exit"
                onClick={this.props.setModal}
            >Exit</Button>
            </Form>
        </div>
          </Modal>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceModal);