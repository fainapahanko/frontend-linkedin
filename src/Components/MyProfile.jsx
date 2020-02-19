import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import MyProfileHeader from "./MyProfileHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ExperienceModal from "./ExperienceModal";
import MyExperience from "./MyExperience";
import { Row, Col } from "reactstrap";
import Api from "../API";
import AllUsersList from "./AllUsersList";
import "../main.css";
import "../index.css";
import { connect } from "react-redux";

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  addCurrentUser: user => dispatch({
      type: "ADD_CURRENT_USER",
      payload: user
  })
})

const MyProfile = (props) => {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})

    const toggle = () => {
        setModal(!modal)
    };

    const fetchingUsers = async () => {
        let username = localStorage.getItem('username')
        let response = await Api.fetch("/profile", "GET");
        let users = response.filter(resp => resp.username !== username)
        setUsers(users)
        console.log(users)
    }

    const getMyProfile = async() => {
      const token = localStorage.getItem('token')
      let resp = await fetch('http://localhost:3433/profile/me', {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
      if(resp.ok) {
        let currentUser = await resp.json()
        console.log(currentUser)
        setUser(currentUser)
      } else {
        console.log('loch')
      }
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          fetchingUsers()
          getMyProfile()
          setLoading(false)
        },1500)
    }, [])
    console.log(props)
    return (
      <Row>
        <Col className="col-lg-7 col-12 mt-3">
          {loading ? (
            <>
              <Loader
                color="#007ACC"
                height={40}
                width={40}
                type="TailSpin"
                className="loader-profile-page"
              />
            </>
          ) : (
            <div className="profile-main-div">
              <MyProfileHeader user={user.profile} />
            </div>
          )}
          {loading ? (
            <>
              <Loader
                color="#007ACC"
                height={40}
                width={40}
                type="TailSpin"
                className="loader-profile-page"
              />
            </>
          ) :  (
              <div className="mt-3 px-5 py-4 profile-main-div">
                <div className="icon-profile-div">
                    <FontAwesomeIcon
                    onClick={toggle}
                    className="fapencil"
                    icon={faPlus}
                />
                </div>
                <h3 style={{ fontSize: "26px" }}>Experience</h3>
                {user.experience ? user.experience.map((u, i) => (
                  <MyExperience
                    usExpData={u}
                    key={i}
                  />
                )): <></>}
              </div>
            )
          }
        </Col>
        <Col className="col-5 d-none d-lg-block  mt-3">
          {users && (
            <div className="p-3">
              {users.map((u, i) => (
                <AllUsersList user={u} key={i} />
              ))}
            </div>
          )}
        </Col>
        {modal && (
          <ExperienceModal
            setModal={toggle}
            open={modal}
          />
        )}
      </Row>
    );
  };

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
