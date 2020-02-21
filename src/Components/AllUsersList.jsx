import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import UsersInfo from './UsersInfo'

const AllUsersList = (props) => {
    const [hover, setHover] = useState(false)

    return ( 
        <>
            <Link to={"/currentUserPage" + props.user.username} onClick={props.toogleDropdown} style={{ textDecoration: 'none'}}>
            <Row className="mb-2 users-list-div">
            {props.user.image ? 
                <Col md="3"><img alt="users-img" className='users-img-list' src={props.user.image} onMouseOut={() => setHover(!hover)} onMouseOver={() => setHover(!hover)}alt="Nice pic, Jeff" /></Col> : 
                <Col md="3"><img alt="users-img" className='users-img-list' onMouseOut={() => setHover(!hover)} onMouseOver={() => setHover(!hover)} src="https://cdn3.iconfinder.com/data/icons/flat-pro-user-management-set-4/32/user-unknown-woman-512.png" /></Col>
            }
            <Col md="9" className="pt-2" style={{display: "inline-block"}}><span style={{fontWeight: "bold"}}>{props.user.name} {props.user.surname}</span> 
            <br/>
                {props.user.title}</Col>
                {hover && <UsersInfo userData={props.user} isHover={hover} setHover={() => setHover(!hover)}/>}
                </Row>
            </Link>
        </>
    );
}
 
export default AllUsersList;