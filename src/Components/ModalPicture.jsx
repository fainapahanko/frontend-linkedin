import React from 'react';
import { Modal, Row, Col, Button, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactCrop from 'react-image-crop';
import Api from '../API'
import {connect} from 'react-redux'
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import '../main.css'
import { useState } from 'react';

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

const ModalPicture = (props) => {
    const [file, setFile] = useState(null)

    const uploadPucture= async() => {
        const formData = new FormData();
        formData.append("profile", file)
        let resp = await Api.fetch(`/profile/${props.currentUser.username}/picture`, 'POST', formData)
        console.log(resp)
        if(resp){
            console.log(resp)
            props.addCurrentUser(resp)
        } else {
            console.log(resp)
        }
        props.setModalPicture(!props.open)
    }

    console.log(props) 
    return (
        <div>
                <Modal isOpen={props.open}>
                <Row>
                    <Col md="10">
                        <div style={{fontSize: "14px", padding: "10px 10px 10px 20px",color: "gray"}}>Edit photo</div>
                    </Col>
                    <Col md="2">
                        <FontAwesomeIcon style={styleIcon} onClick={() => props.setModalPicture(!this.props.open)} icon={faTimes} />
                    </Col>
                    <Col md="12">
                        <div style={divStyle}>
                            <ReactCrop width="350px" alt="smthng" src={props.currentUser.image} />} 
                        </div>
                    </Col>
                    <Col md="12" className="p-4" style={{textAlign: "center"}}>
                        <div>
                            <StyledDropZone 
                                onDrop={(file, text) => setFile(file)}
                            />
                        </div>
                        <div>
                        <Button style={{backgroundColor:"white", border: "1px solid #007ACC", color: "#007ACC", width: "100px"}} onClick={uploadPucture}>Upload</Button>
                        <Button style={{backgroundColor:"white", border: "1px solid #007ACC", color: "#007ACC", width: "100px"}} onClick={() => props.setModalPicture(!props.open)}>Exit</Button>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
        );
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ModalPicture);