import React from 'react';
import Loader from 'react-loader-spinner';
import ProfileHeader from './ProfileHeader'
import '../index.css'
import Experience from './Experience'
import {Row, Col} from'reactstrap'
import Api from '../API'
import AllUsersList from './AllUsersList';
import '../main.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => state

class CurrentUserPage extends React.Component {
    state = { 
        loading: true,
        user: {},
        experience: []
    }
    render() {
        console.log(this.state.user)
        return ( 
            <Row>
                <Col className="col-lg-7 col-12 mt-3">
                {this.state.loading ? 
                    <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </> : 
                    <div className="profile-main-div"> <ProfileHeader user={this.state.user} /> </div>
                }
                {this.state.loading ? 
                    <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </> :
                    this.state.experience && <div className="mt-3 px-5 py-4 profile-main-div"> 
                        <h3 style={{fontSize: "26px"}}>Experience</h3> 
                    {this.state.experience
                    .map((u,i) => ( <Experience experience={u} key={i} />))}</div>
                }
                </Col>
                <Col className="col-5 d-none d-lg-block  mt-3">
                    {this.props.users && <div className="p-3">{this.props.users.map((u,i)=>(<AllUsersList user={u} key={i} />))}</div>}
                </Col>
            </Row>
         );
    }
    componentDidMount = () => {
        this.fetchingCurrentUser()
        this.fetchingCurrentExpirience()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.username !== this.props.match.params.username){
            this.fetchingCurrentUser()
            this.fetchingCurrentExpirience()
        }
    }

    fetchingCurrentExpirience = async() => {
        let resp = await Api.fetch('/profile/' + this.props.match.params.username + '/experiences', 'GET')
        this.setState({
            experience: resp,
            loading: false
        })
    }

    fetchingCurrentUser = async() => {
        this.setState({
            loading: true
        })
        let resp = await Api.fetch('/profile/' + this.props.match.params.username, 'GET')
        this.setState({
            user: resp,
            loading: false
        })
    }
}
 
export default withRouter(connect(mapStateToProps)(CurrentUserPage));
