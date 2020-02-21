import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import '../main.css'
import ProfileModal from './ProfileModal'
import { connect, useSelector } from 'react-redux';
import ModalPicture from './ModalPicture'
let divStyle = {
    backgroundImage: "url(https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg",
    width: "100%",
    height: "200px"
}
let userImgStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid white",
    position: "relative",
    top: "-100px",
    left: "50px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
}
const mapStateToProps = state => state

const MyProfileHeader = (props) => {
    const [modalPicture, setModalPicture] = useState(false)
    const [modalProfile, setModalProfile] = useState(false)

    console.log(props)
    return ( 
        <>
            <div style={divStyle}>
            </div>
            <div className="icon-profile-div">
                <FontAwesomeIcon
                onClick={() => setModalProfile(!modalProfile)}
                className="fapencil"
                icon={faPencilAlt}
            />
            </div>
            {props.currentUser ? <> <img style={userImgStyle} onClick={() => setModalPicture(!modalPicture)} src={props.currentUser.image} alt=""/> 
            <div className="user-info-current-profile-header">
                <h4>{props.currentUser.name} {props.currentUser.surname}</h4>
                <p style={{margin: "5px 0px"}}>{props.currentUser.title}</p>
                <p style={{margin: "5px 0px"}}>{props.currentUser.area}</p>
            </div> </>
        : <> <img style={userImgStyle} onClick={() => setModalPicture(!modalPicture)} src='https://fooddole.com/Modules/eCommerce/images/default-img.png' alt=""/>
        <h4>Provide ypur info</h4>
        </>}
        {modalPicture && <ModalPicture profile={props.currentUser} open={modalPicture} setModalPicture={setModalPicture}/>}
        {modalProfile && <ProfileModal setModal={setModalProfile} profile={props.currentUser} open={modalProfile} />}
        </>
    );
}

export default connect(mapStateToProps)(MyProfileHeader);