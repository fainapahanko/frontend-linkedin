import React from 'react';
import { Media } from 'reactstrap'

let styleDiv = {
    width: "300px",
    heigth: "200px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "#1C3E4E",
    zIndex: "1",
    color: "white",
    textAlign: "center",
    borderRadius: "10px",
    padding: "10px 10px"
}
let imgStyle = {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    display: "inline-block",
    borderRadius: "50%"
}

class UsersInfo extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div style={styleDiv} isOpen={this.props.isHover}>
                {this.props.userData.image ? 
                    <Media style={imgStyle} src={this.props.userData.image} alt="Generic placeholder image" /> : 
                    <Media style={imgStyle} width="100px" src="https://cdn3.iconfinder.com/data/icons/flat-pro-user-management-set-4/32/user-unknown-woman-512.png" />}
                <div style={{display: "inline-block"}}>
                    <p>{this.props.userData.name} {this.props.userData.surname}</p>
                    <p>{this.props.userData.bio} </p>
                </div>
            </div>
         );
    }
}
 
export default UsersInfo;