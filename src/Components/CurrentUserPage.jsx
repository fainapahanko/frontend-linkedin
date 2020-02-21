import React, {useState, useEffect, useRef} from 'react';
import Loader from 'react-loader-spinner';
import ProfileHeader from './ProfileHeader'
import '../index.css'
import Experience from './Experience'
import {Row, Col} from'reactstrap'
import Api from '../API'
import AllUsersList from './AllUsersList';
import '../main.css'
import { withRouter } from 'react-router-dom';

const CurrentUserPage = (props) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const mounted = useRef();

    const fetchingUsers = async () => {
        let username = localStorage.getItem('username')
        let response = await Api.fetch("/profile", "GET");
        let users = response.filter(resp => resp.username !== username)
        setUsers(users)
        console.log(users)
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetchingCurrentUser()
            setLoading(false)
        },1500)
    },[props.match.params.username])

    useEffect(() => {
        fetchingCurrentUser()
        fetchingUsers()
    }, [])

    const fetchingCurrentUser = async() => {
        setLoading(true)
        console.log(props.match.params.username)
        let resp = await Api.fetch('/profile/' + props.match.params.username, 'GET')
        // let resp = await fetch(`http://localhost:3433/profile/${props.match.params.username}`, {
        //     method: "GET"
        // })
        console.log(resp)
        setUser(resp)
        setLoading(false)
    }
    return ( 
        <Row>
            <Col className="col-lg-7 col-12 mt-3">
            {loading ? 
                <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </> : 
                <div className="profile-main-div"> <ProfileHeader user={user} /> </div>
            }
            {loading ? 
                <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </> :
                user.experience && <div className="mt-3 px-5 py-4 profile-main-div"> 
                    <h3 style={{fontSize: "26px"}}>Experience</h3> 
                {user.experience
                .map((u,i) => ( <Experience experience={u} key={i} />))}</div>
            }
            </Col>
            <Col className="col-5 d-none d-lg-block  mt-3">
                {users && <div className="p-3">{users.map((u,i)=>(<AllUsersList user={u} key={i} />))}</div>}
            </Col>
        </Row>
        );
}
 
export default withRouter(CurrentUserPage);
