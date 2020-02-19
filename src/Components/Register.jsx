import React, {useState, useEffect} from 'react';
import Loader from './LoadingComponent'
import {Form, FormGroup, Label, Button, FormText, Input, FormFeedback} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch({
        type:"ADD_CURRENT_USER",
        payload: user
    })
})

const Register = (props) => {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [registered, setRegistered] = useState(false)
    const [profile, setProfile] = useState({})
    const [file, setFile] = useState({})

    const handleRegister = async() => {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        const credentials = {
            password: password,
            username: username 
        }
        let response = await fetch('http://localhost:3433/users/signup', {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "content-type": "application/json"
            }
        })
        if(response.ok) {
            let token = await response.json()
            localStorage.setItem('token', token.token)
            props.setUser(token.user)
            setRegistered(true)
        } else {
            console.log('nu i loch')
            localStorage.setItem('username', undefined)
        }
    }

    const register = async(e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            handleRegister()
        }, 1500)
    }

    const handleProfile = async(e) => {
        e.preventDefault()
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('token')
        const resp = await fetch(`http://localhost:3433/profile/${username}`, {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        })
        if(resp.ok) {
            let user = await resp.json()
            props.setUser(user)
            const formData = new FormData();
            formData.append("profile", file)
            const picResp = await fetch(`http://localhost:3433/profile/${username}/picture`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
            if(picResp.ok) {
                let currentUser = await picResp.json()
                console.log("URRSAAAA")
                props.setUser(currentUser)
                props.history.push("/profile")
            } else {
                console.log("Da blya :(")
            }
        }
    }

    return (
        <>
        {loading ? <Loader /> : 
        !registered 
        ? <Form onSubmit={register}>
                <FormGroup>
                    <Label for="username">Choose your username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} id='username' type="text" />
                    <FormFeedback>You will not be able to see this</FormFeedback>
                    <FormText>Please choose carefully.</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Choose your password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} id='password' type='password' />
                    <FormFeedback>You will not be able to see this</FormFeedback>
                    <FormText>Dont't tell anybody</FormText>
                </FormGroup>
                <Button>Register</Button>
            </Form> : registered && <Form onSubmit={handleProfile}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input onChange={(e) => setProfile({...profile,[e.target.id]: e.target.value})} id='name' type="text" />
                    <FormText>Enter your name.</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="surname">Surname</Label>
                    <Input onChange={(e) => setProfile({...profile,[e.target.id]: e.target.value})} id='surname' type='text' />
                    <FormText>Enter your surname</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input onChange={(e) => setProfile({...profile,[e.target.id]: e.target.value})} id='email' type='text' />
                    <FormText>Enter your email</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="image">Your photo</Label>
                    <Input onChange={(e) => setFile({[e.target.id]: e.target.files[0]})} id='image' type='file' />
                    <FormText>Choose your image</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="area">Area</Label>
                    <Input onChange={(e) => setProfile({...profile,[e.target.id]: e.target.value})} id='area' type='text' />
                    <FormText>Enter your area</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="title">Your role</Label>
                    <Input onChange={(e) => setProfile({...profile,[e.target.id]: e.target.value})} id='title' type='text' />
                    <FormText>Enter your role</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="bio">Short Bio</Label>
                    <Input onChange={(e) => setProfile({...profile,[e.target.id]: e.target.value})} id='bio' type='text' />
                    <FormText>Enter your biography</FormText>
                </FormGroup>
                <Button>Set Profile</Button>
            </Form> 
            }
        </>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))