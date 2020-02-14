import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CurrentUserPage from './CurrentUserPage'
import CallbackComponent from './CallbackComponent'
import Register from './Register'
import Login from './Login'
import Newsfeed from './NewsFeed'
import {Container} from 'reactstrap'
import NavigationBar from './NavigationBar';
import Profile from './MyProfile'
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
    const token = localStorage.getItem('token')
    console.log(token)
    const response = await fetch('http://localhost:3433/users/refresh', {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
      }
    })
    console.log(response)
    if(response.ok){
      let token = await response.json()
      props.setToken(token.token)
      localStorage.setItem('token', token.token)
      const resp = await fetch('http://localhost:3433/profile/me',{
          headers: {
            "Authorization": "Bearer " + token.token,
        }
      })
      if(resp){
        const currentUser = await resp.json()
        props.setUser(currentUser)
      }
    }
    else {
      localStorage.setItem('token', undefined)
    }
  }

  useEffect(() => {
    console.log("hello")
    checkAurth()
  }, [])

  return ( 
    <Router>
      <NavigationBar />
      <Container className="parentcontainer">
          <Switch>
              <Route path='/' exact component={Newsfeed} />
              <Route path="/Profile" component={Profile} />
              <Route path="/currentUserPage:username" component={CurrentUserPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/Newsfeed" component={Newsfeed}/>
              <Route path="/callback">
                <CallbackComponent />{/* setUserAuth={(userAuth) => this.setState({ userAuth: userAuth})} */}
              </Route>
          </Switch>
      </Container>   
    </Router>
    );
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Main);