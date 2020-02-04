import React from 'react';
import Loader from 'react-loader-spinner';
import MyProfileHeader from './MyProfileHeader'
import '../index.css'
import ExperienceModal from './ExperienceModal'
import MyExperience from './MyExperience'
import {Row, Col} from'reactstrap'
import Api from '../API'
import AllUsersList from './AllUsersList';
import '../main.css'
import { connect } from 'react-redux';

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    setAllUsers: users => dispatch({
        type: "ADD_ALL_USERS",
        payload: users
    })
})
class MyProfile extends React.Component {
    state = { 
        loading: true,
        profile: '',
        expirience: '',
        modal: false
    }
    setModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    render() {
        return ( 
            <Row>
                <Col className="col-lg-7 col-12 mt-3">
                {this.state.loading ? 
                    <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </> : 
                    <div className="profile-main-div"> <MyProfileHeader /> </div>
                }
                {this.state.loading ? 
                    <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </> :
                    this.state.expirience && <div className="mt-3 px-5 py-4 profile-main-div"> 
                        <h3 style={{fontSize: "26px"}}>Experience</h3> 
                        <h4 onClick={this.setModal}>Add Experience</h4>
                    {this.state.expirience
                    .map((u,i) => ( <MyExperience fetchExp={this.fetchExp} usExpData={u} key={i} />))}</div>
                }
                </Col>
                <Col className="col-5 d-none d-lg-block  mt-3">
                    {this.props.users && <div className="p-3">{this.props.users.map((u,i)=>(<AllUsersList user={u} key={i} />))}</div>}
                </Col>
                {this.state.modal && <ExperienceModal setModal={this.setModal} open={this.state.modal} fetchExp={this.fetchExp} />}
            </Row>
         );
    }
    componentDidMount = () => {
        this.fetchingUsers()
        this.fetchExp()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.userId !== this.props.match.params.userId){
            this.fetchingCurrentUser()
            this.fetchingCurrentExpirience()
        }
    }

    fetchExp = async() => {
        let response = await Api.fetch(`/profile/${Api.USER}/experiences`, 'GET')
        this.setState({
            expirience: response
        })
    }
    
    fetchingUsers = async() => {
        this.setState({
            loading: true
        })
        let response = await Api.fetch('/profile', 'GET')
        this.props.setAllUsers(response)
        this.setState({
            loading: false,
        })
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);