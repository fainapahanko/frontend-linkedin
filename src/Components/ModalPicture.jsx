import React from 'react';
import { Modal, Row, Col, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactCrop from 'react-image-crop';
import Api from '../API'
import {connect} from 'react-redux'
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import '../main.css'

let styleIcon = {
    fontSize: "40px",
    color: "black",
    padding: "10px 10px 10px 0px",
    boxSizing: "unset !important",
}
let divStyle = {
    width: "100%",
    backgroundColor: "black",
    textAlign: "center"
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    addCurrentUser: user => dispatch({
        type: "ADD_CURRENT_USER",
        payload: user
    })
})

class ModalPicture extends React.Component {
    state = { 
        file: null,
    }

    uploadPucture= async() => {
        const formData = new FormData();
        formData.append("profile", this.state.file)
        let resp = await Api.request("/profile/" + Api.USER + "/picture", "POST", formData);
        if(resp){
            console.log("yo")
            this.props.addCurrentUser(resp)
        }
        this.props.setModalPicture()
    }

    render() {
        console.log(this.props) 
        return (
            <div>
                 <Modal isOpen={this.props.open}>
                    <Row>
                        <Col md="10">
                            <div style={{fontSize: "14px", padding: "10px 10px 10px 20px",color: "gray"}}>Edit photo</div>
                        </Col>
                        <Col md="2">
                            <FontAwesomeIcon style={styleIcon} onClick={this.props.setModalPicture} icon={faTimes} />
                        </Col>
                        <Col md="12">
                            <div style={divStyle}>
                               {this.state.file ? <ReactCrop width="350px" src={this.state.file} alt="smthng" crop={this.state.crop} onChange={this.onCropChange} /> : <ReactCrop width="350px" alt="smthng" src={this.props.profile.image} crop={this.state.crop} onChange={this.onCropChange} />} 
                            </div>
                        </Col>
                        <Col md="12" className="p-4" style={{textAlign: "center"}}>
                            <div>
                                <StyledDropZone 
                                onDrop={(file, text) => this.setState({file: file})} 
                                />
                            </div>
                            <div>
                            <Button style={{backgroundColor:"white", border: "1px solid #007ACC", color: "#007ACC", width: "100px"}} onClick={this.uploadPucture}>Upload</Button>
                            <Button style={{backgroundColor:"white", border: "1px solid #007ACC", color: "#007ACC", width: "100px"}} onClick={this.props.setModalPicture}>Exit</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
         );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ModalPicture);