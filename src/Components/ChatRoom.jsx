import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {Input} from 'reactstrap'
import io from "socket.io-client";
import '../main.css'
import { connect } from 'react-redux';

const mapStateToProps = state => state

class ChatRoom extends React.Component {
    socket = null
    state = { 
        message: '',
        messages: []
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
        const options = {
            transports: ["websocket"]
        };
        this.socket = io(`https://striveschool.herokuapp.com`,options)
        const username = this.props.currentUser.username
        this.socket.emit('setUsername',{
            username: username
        });
        let resp = await fetch(`https://striveschool.herokuapp.com/api/messages/${this.props.user.username}`, {
            method:'get'
        })
        if(resp.ok) {
            let msgs = await resp.json()
            console.log(msgs)
            this.setState({messages: msgs})
        }
    
        this.socket.on("chatmessage", msg => {
            console.log(msg)
            this.setState({
                messages: [...this.state.messages, msg]
            });
        });
        this.socket.on('list', (value) => {
            console.log('list of users recieved', value)
        })
        //console.log(this.state)
    }
    sendMessage = async(e) => {
        e.preventDefault();
        
        this.socket.emit("chatmessage", {
            from: this.props.currentUser.profile.username,
            to: this.props.user.username,
            text: this.state.message
        });
        this.setState({
            message: ""
        });
        //console.log(this.state)
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
                        {/* <div>
                            <ul>
                                {this.state.messages && this.state.messages.map((s,i) => <ol key={i}>{s}</ol>)}
                            </ul>
                        </div> */}
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