import React from 'react';
import {Alert} from 'reactstrap'
import '../main.css'

const ErrorMessage = () => {
    return ( 
        <Alert className="error-message" color="danger">
            <p>Ooops. Please check your login and password and try again later</p>  
        </Alert>
    );
}
 
export default ErrorMessage;