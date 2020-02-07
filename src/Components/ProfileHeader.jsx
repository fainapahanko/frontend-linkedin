import React from 'react';
import '../main.css'
import ChatRoom from './ChatRoom'

class MyProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          chat: false,
          username: null,
          message: "",
          messages: [],
          showModal: true
        };
    }
    toggleChat = () => {
        this.setState({
            chat: !this.state.chat
        })
    }
    render(){
        const props = this.props
        return ( 
            <>
                <div className='profile-div-header'>
                </div>
                {props.user.image ? <img className='user-info-current-profile-header-img' src={props.user.image} alt="profile"/> : <img className='user-info-current-profile-header-img' alt="profile" src="https://www.legalniewsieci.pl/!data/newsy/news_1982.jpg" /> }
                <div className="user-info-current-profile-header">
                    <h4>{props.user.name} {props.user.surname}</h4>
                    <p style={{margin: "5px 0px"}}>{props.user.title}</p>
                    <p style={{margin: "5px 0px"}}>{props.user.area}</p> 
                </div>
                <button onClick={this.toggleChat}>Write a message</button>
                {this.state.chat && <ChatRoom user={props.user} toggle={this.toggleChat} />}
            </>
        );
    }
}

export default MyProfileHeader;