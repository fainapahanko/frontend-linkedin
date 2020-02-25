import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CurrentUserPage from './CurrentUserPage'
import CallbackComponent from './CallbackComponent'
import Register from './Register'
import Login from './Login'
import Api from '../API'
import PrivateRoute from './PrivateRoute'
import Newsfeed from './NewsFeed'
import {Container} from 'reactstrap'
import NavigationBar from './NavigationBar';
import MyProfile from './MyProfile'
import { connect } from 'react-redux';

const mapStateToProps = state=> state

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({
      type:"ADD_CURRENT_USER",
      payload: user
  }),
  setToken: token => dispatch({
    type:"ADD_TOKEN",
    payload: token
  })
})

const Main = (props) => {

  const checkAurth = async() => {
    const response = await Api.fetch('/users/refresh', "POST")
    if(response){
      props.setToken(response.token)
      localStorage.setItem('token', response.token)
      props.setToken(response.token)
      const resp = await Api.fetch('/profile/me','GET')
      if(resp){
        props.setUser(resp)
      }
    }
    else {
      localStorage.setItem('token', undefined)
      localStorage.setItem('username', undefined)
      localStorage.setItem('password', undefined)
    }
  }

  const checkAccess = () => {
    let isAuthenticated;
    if(localStorage.getItem('token') == undefined) isAuthenticated = false
    else isAuthenticated = true
    return isAuthenticated
  }

  useEffect(() => {
    checkAurth()
  }, [])

  return ( 
    <Router>
      <NavigationBar />
      <Container className="parentcontainer">
          <Switch>
              <Route path='/' exact component={Newsfeed} />
              <PrivateRoute isAuthenticated={checkAccess} path="/profile" component={MyProfile} />
              <Route path="/currentUserPage:username" component={CurrentUserPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/newsfeed" component={Newsfeed}/>
              <Route path="/callback">
                <CallbackComponent />
              </Route>
          </Switch>
      </Container>   
    </Router>
    );
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Main);