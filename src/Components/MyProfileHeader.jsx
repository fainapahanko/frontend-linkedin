import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import '../main.css'
import ProfileModal from './ProfileModal'
import { connect } from 'react-redux';
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

class MyProfileHeader extends React.Component {
    state = {
        modalPicture: false,
        modalProfile: false
    }
    setModalPicture=()=> {
        this.setState({
            modalPicture: !this.state.modalPicture
        })
    }
    setModalProfile=()=> {
        this.setState({
            modalProfile: !this.state.modalProfile
        })
    }
    render() {
        const props = this.props
        return ( 
            <>
                <div style={divStyle}>
                </div>
                <div className="icon-profile-div">
                    <FontAwesomeIcon
                    onClick={this.setModalProfile}
                    className="fapencil"
                    icon={faPencilAlt}
                />
                </div>
                {props.currentUser.image ? <img style={userImgStyle} onClick={this.setModalPicture} src={props.currentUser.image} alt=""/> : <img onClick={this.setModalPicture} style={userImgStyle} src="https://www.legalniewsieci.pl/!data/newsy/news_1982.jpg" /> }
                <div className="user-info-current-profile-header">
                    <h4>{props.currentUser.name} {props.currentUser.surname}</h4>
                    <p style={{margin: "5px 0px"}}>{props.currentUser.title}</p>
                    <p style={{margin: "5px 0px"}}>{props.currentUser.area}</p>
                </div>
                {this.state.modalPicture && <ModalPicture profile={props.currentUser} open={this.state.modalPicture} setModalPicture={this.setModalPicture}/>}
                {this.state.modalProfile && <ProfileModal 
                setModal={this.setModalProfile} profile={props.currentUser} open={this.state.modalProfile} />}
            </>
        );
    }
}

export default connect(mapStateToProps)(MyProfileHeader);