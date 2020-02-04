import React from 'react';
import { Media } from 'reactstrap';
import {Link} from 'react-router-dom'
import '../main.css'

class UsersList extends React.Component{
    state = {}
    render() {
    return ( 
        <Media className="px-4 pt-3 media-div">

            <Link to={"/currentUserPage" + this.props.user.username} onClick={this.props.toogleDropdown} style={{ textDecoration: 'none'}}>

                <Media left className="user-image-box-search">
                    {this.props.user.image ? <Media className="user-image-search" src={this.props.user.image} alt="Generic placeholder image" /> : <Media className="user-image-search" src="https://cdn3.iconfinder.com/data/icons/flat-pro-user-management-set-4/32/user-unknown-woman-512.png" />}
                </Media> 
                <Media className="px-2 user-text-search" body>
                    <span className="name-surname-user-search">{this.props.user.name} {this.props.user.surname}</span> : {this.props.user.title}
                </Media>
            </Link>
        </Media>
        );
    }
}
 
export default UsersList;