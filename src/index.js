import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main';
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store/index'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css'

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <Main />
        </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
