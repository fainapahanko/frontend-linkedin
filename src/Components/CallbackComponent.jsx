import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
      type:"SET_USERBASE64",
      payload: base64
    }) 
  })
  

const CallbackComponent = (props) => {
    useEffect(() => {
        const search = document.location.search;
        if (search && search.includes("token")){
            const tokenUser = search.split("=")[1];
            const token = tokenUser.split("&")[0]
            const username = search.split("=")[2];
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
            props.history.push("/profile")
        }
    },[])
    console.log(props)
    return (<div>Loading...</div>)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CallbackComponent))