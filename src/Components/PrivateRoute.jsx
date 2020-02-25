
import React, { Component } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={(props) =>
                isAuthenticated()
                ? <Component {...props} /> 
                : <Redirect to="/login" />
    }/>
)

export default  withRouter(PrivateRoute)