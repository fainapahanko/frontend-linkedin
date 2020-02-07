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
        // const options = {
        //     transports: ["websocket"]
        // };
        // this.socket = io(`https://striveschool.herokuapp.com/api/messages/admin`,options)
        // this.socket.on('bmsg', (msg) => {
        //     console.log('hello')
        //     this.setState({
        //         messages: msg
        //     })
        // })
        // console.log(this.state)
        // console.log(this.socket)
        const options = {
            transports: ["websocket"]
        };
        console.log(this.socket)
        this.socket = io(`https://striveschool.herokuapp.com/api/messages/${this.props.currentUser.username}`,options)
        console.log(this.socket)
        this.socket.on('bmsg', (msg) => {
            console.log('hello')
            this.setState({
                messages: this.state.messages.concat(msg)
            })
        })
    }
    sendMessage = (e) => {
        e.preventDefault();
        const username = {
            username: this.props.currentUser.username,
        }
        const chatmessage = {
            to: this.props.user.username,
            msg: this.state.message
        }
        const msg = {
            from: this.props.currentUser.username,
            to: this.props.user.username,
            text: this.state.message
        }
        if (this.state.message !== "") {
            this.socket.emit("bmsg", msg);
          this.setState({
            message: ""
          });
        }
        // if (this.state.message !== "") {
        //     this.socket.emit("bmsg", {username, chatmessage});
        //   this.setState({
        //     message: ""
        //   });
        // }
        console.log(this.state)
        console.log(this.socket)
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