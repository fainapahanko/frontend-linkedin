import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CurrentUserPage from './CurrentUserPage'
import Newsfeed from './NewsFeed'
import {Container} from 'reactstrap'
import NavigationBar from './NavigationBar';
import Profile from './MyProfile'

class Main extends React.Component {
  state = {  }
  render() { 
    return ( 
      <Router>
        <NavigationBar />
      
        <Container className="parentcontainer">
            <Switch>
                <Route path='/' exact component={Profile} />
                <Route path="/Profile" exact component={Profile} />
                <Route path="/currentUserPage:username" component={CurrentUserPage} />
                <Route path="/Newsfeed" component={Newsfeed}/>
            </Switch>
        </Container>   
      </Router>
     );
  }
}
 
export default Main;