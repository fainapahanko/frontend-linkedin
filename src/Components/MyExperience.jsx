import React, { Component, useState } from 'react';
import { Media, Modal, Form, Label, Input, Button, FormGroup } from 'reactstrap';
import Moment from 'react-moment';
import Api from '../API'
import ExperienceModal from './ExperienceModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import '../main.css'

const mapDispatchToProps = dispatch => ({
    addCurrentUser: user => dispatch({
        type: "ADD_CURRENT_USER",
        payload: user
    })
})

const CurrentExpirience = (props) => {
    const [modal, setModal] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [error, setError] = useState(undefined)
    const toggle = () => {
        setModal(!modal)
    };

    const deleteExp = async(id) => {
        setError(undefined)
        const response = Api.fetch(`/profile/${Api.USER}/experiences/${id}`, 'DELETE')
        if(response){
            const me = Api.fetch('/profile/me', 'GET')
            props.addCurrentUser(me)
        } else {
            setError("Something went wrong")
        }
    }

    const now = new Date()
    return ( 
    
        <Media className="my-5">
            <Media left href="#">
                {props.usExpData.image ? <Media className='user-img-style-exp' object src={props.usExpData.image} alt="Generic placeholder image" /> : <Media object className='user-img-style-exp'  src="http://www.gigabitmagazine.com/sites/default/files/styles/slider_detail/public/topic/image/GettyImages-1017193718_1.jpg?itok=W4-tjXij" /> }
            </Media>
            <Media body className="pl-4">
                <Media className='header-style-media' heading>
                    {props.usExpData.role}
                </Media>
                {props.usExpData.company}
                <br/>
                <div className='date-area-style'>
                    <Moment format="YYYY/MM/DD">
                    {props.usExpData.startDate}
                    </Moment> 
                    -
                    {props.usExpData.endDate === null ? 
                        <Moment format="YYYY/MM/DD"> 
                            {now} 
                        </Moment> : 
                        <Moment format="YYYY/MM/DD"> 
                        {props.usExpData.endDate}
                        </Moment> 
                    }
                <br/>
                {props.usExpData.area && props.usExpData.area}
                <br/>
                <div style={{color: "black"}}>
                    {props.usExpData.description && props.usExpData.description}
                    </div>
                </div>
                <hr/>
            </Media>
            <div className="icon-profile-div">
                    <FontAwesomeIcon
                        onClick={setModal}
                        icon={faPencilAlt}
                    />
            </div>
            <div className="icon-profile-div">
                    <FontAwesomeIcon
                        onClick={() => setModalDelete(true)}
                        icon={faTimes}
                    />
            </div>
            {modal && <ExperienceModal fetchExp={props.fetchExp} experience={props.usExpData} setModal={toggle}
            open={modal} />}
            {modalDelete && <Modal className='modal-content-exp' isOpen={modalDelete}>
                                        <h2>Are you sure?</h2>
                                        <Button className="btn-exp-modal-delete btn-info" onClick={() => deleteExp(props.usExpData._id)}>Delete</Button>
                                        <Button className="btn-exp-modal-delete btn-info"  onClick={() => setModalDelete(false)}> Don't delete </Button>
                                    {error && <h3>{error}</h3>}
                            </Modal>}
        </Media>
    );
}
 
export default connect(mapDispatchToProps)(CurrentExpirience);