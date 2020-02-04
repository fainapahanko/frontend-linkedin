import React from 'react';
import '../main.css'
let divStyle = {
    backgroundImage: "url(https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg",
    width: "100%",
    height: "200px"
}
let userImgStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid white",
    position: "relative",
    top: "-100px",
    left: "50px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
}

const MyProfileHeader = (props) => {
    return ( 
        <>
            <div style={divStyle}>
            </div>
            {props.user.image ? <img style={userImgStyle} src={props.user.image} alt="profile"/> : <img style={userImgStyle} alt="profile" src="https://www.legalniewsieci.pl/!data/newsy/news_1982.jpg" /> }
            <div className="user-info-current-profile-header">
                <h4>{props.user.name} {props.user.surname}</h4>
                <p style={{margin: "5px 0px"}}>{props.user.title}</p>
                <p style={{margin: "5px 0px"}}>{props.user.area}</p> 
            </div>
        </>
    );
    
}

export default MyProfileHeader;