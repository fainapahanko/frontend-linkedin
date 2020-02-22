import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Api from '../API'
import {Input} from 'reactstrap'
import io from "socket.io-client";
import '../main.css'
import { connect } from 'react-redux';
import Moment from 'react-moment'

const mapStateToProps = state => state

class ChatRoom extends React.Component {
    socket = null
    state = { 
        message: '',
        messages: []
    }
    getBoxClassNames = (from) => {
        if(from === localStorage.getItem('username')){
            return 'msg-author'
        } else return 'msg-receiver'
    }
    something = () => {
        this.props.toggle()
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            message: e.target.value
        })
    }
    componentDidMount = async() => {
        let msgs = await Api.fetch('/msg','GET')
        const messages = msgs.filter(msg => msg.from === this.props.user.username || msg.to === this.props.user.username)
        this.setState({
            messages: messages
        })
        const options = {
            transports: ["websocket"]
        };

        this.socket = io(`https://linkedin-api.azurewebsites.net`,options)
    
        this.socket.on("message", message => {
            this.setState({
              messages: [...this.state.messages, message],
            })
        })

        this.socket.emit("login", {token: localStorage.getItem('token'), username: localStorage.getItem('username')} )
    }

    sendMessage = async(e) => {
        e.preventDefault();
        this.socket.emit("message", {
            from: this.props.currentUser.username,
            to: this.props.user.username,
            text: this.state.message
        });
        this.setState({
            message: ""
        });
        console.log(this.state)
    }

    render() { 
        return ( 
            <>
                <div className='main-div-chat-room'>
                    <div className='main-header-chat-div'>
                        <div className='div-to-structure-chatroom'>
                            <img className="m-2 picture-for-chatroom" src={this.props.user.image} />
                            <h3 className="m-2 username-chatroom-header">{this.props.user.name} {this.props.user.surname}</h3>
                            <div className="m-2  exit-button-chatroom">
                                <FontAwesomeIcon onClick={this.something} className="exit-btn-chatroom" icon={faTimes} />
                            </div>
                        </div>
                    </div>
                    <div className='main-chat-div'>
                        <div>
                            <ul>
                                {this.state.messages ? this.state.messages.map((s,i) => <div key={i} className={this.getBoxClassNames(s.from)}> <Moment className='chat-moment' fromNow>{s.created}</Moment> <br></br> {s.text}</div>) : <></>}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-8'>
                            <input 
                                autoComplete="off"
                                onChange={this.handleChange} 
                                value={this.state.message} 
                                className='input-chatroom' 
                                type="text" 
                            />
                        </div>
                        <div className='col-4'>
                            <button onClick={this.sendMessage} className="btn-chatroom">Send message</button>
                        </div>
                    </div>                    
                </div>
            </>
         );
    }
}
 
export default connect(mapStateToProps)(ChatRoom);