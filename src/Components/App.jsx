import React, { Component } from 'react';
import {Container} from 'reactstrap'
import Main from './Main'
import Login from './Login'
import { connect } from 'react-redux';

const mapStateToProps = state => state

class App extends Component {
    render() { 
        return ( 
            <Container fluid className="px-0">
                {this.props.currentUser ? 
                    <Main />
                    :
                    <Login />
                }
            </Container>
        );
    }
}
 
export default connect(mapStateToProps)(App)