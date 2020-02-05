import React, {Component} from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Api from "../API";
import '../index.css'

class EditComment extends Component {
    state = {
        text: this.props.comment.text,
        modal: false
    };


    toggle = () => this.setState({modal: !this.state.modal});
    onFileChange = (e) => {
        this.setState({[e.target.name]: e.target.files[0]});
    };

    handleOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    submit = () => {
        this.save();
        this.toggle();
    };

    save = () => {
        Api.fetch("/posts/" + this.props.comment.commentId, "PUT", JSON.stringify({text: this.state.text})).then((res) => {
            if (res && res._id && this.state.selectedFile) {
                var formData = new FormData();
                formData.append("image", this.state.selectedFile);
                Api.request("/posts/" + res._id + "/picture", "POST", formData).then((res) => this.props.refresh());
            } else {
                this.props.refresh();
            }
        });
    };

    updateComment = (name, newText) => {
        this.setState({[name]: newText})
    };

    render() {
        return (
            <div>
                <Button className="button-margin" size="sm" onClick={this.toggle}><i
                    className='fas fa-pencil-alt'></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Edit the post</ModalHeader>
                    <ModalBody>
                    <textarea onChange={(e) => this.handleOnChange(e)} value={this.state.text} className="form-control"
                              rows="3" cols="50"
                              name="text"></textarea>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="primary" onClick={this.submit}>Post</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EditComment;
