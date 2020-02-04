import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import UsersInfo from './UsersInfo'
let divStyle = { 
    height: "90px",
    color: "black"
}
let imgStyle = {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "50%"
}
class AllUsersList extends Component {
    state = { 
        isHover: false
     }
    handleHover = () => {
        this.setState({
            isHover: !this.state.isHover
        })
    }
    render() { 
        return ( 
        <>
            <Link to={"/currentUserPage" + this.props.user.username} onClick={this.props.toogleDropdown} style={{ textDecoration: 'none'}}>
            <Row style={divStyle} className="mb-2">
                {this.props.user.image ? 
                    <Col md="3"><img alt="users-img" style={imgStyle} src={this.props.user.image} onMouseOut={this.handleHover} onMouseOver={this.handleHover}alt="Nice pic, Jeff" /></Col> : 
                    <Col md="3"><img alt="users-img" onMouseOut={this.handleHover} onMouseOver={this.handleHover} style={imgStyle} src="https://cdn3.iconfinder.com/data/icons/flat-pro-user-management-set-4/32/user-unknown-woman-512.png" /></Col>
                }
                <Col md="9" className="pt-2" style={{display: "inline-block"}}><span style={{fontWeight: "bold"}}>{this.props.user.name} {this.props.user.surname}</span> 
                <br/>
                 {this.props.user.title}</Col>
                 {this.state.isHover && <UsersInfo userData={this.props.user} isHover={this.state.isHover} setHover={this.handleHover}/>}
            </Row>
            </Link>
        </>
         );
    }
}
 
export default AllUsersList;