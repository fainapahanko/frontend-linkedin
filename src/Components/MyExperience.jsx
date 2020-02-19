import React, { Component, useState } from 'react';
import { Media } from 'reactstrap';
import Moment from 'react-moment';
import ExperienceModal from './ExperienceModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
let userImgStyle = {
    width: "60px",
    height: "60px",
    objectFit: "cover",
}
let headerStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "0px"
}
let dateAreaStyle = {
    fontSize: "15px",
    color: "gray"
}

const CurrentExpirience = (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    };
    const now = new Date()
    return ( 
    
        <Media className="my-5">
            <Media left href="#">
                {props.usExpData.image ? <Media style={userImgStyle} object src={props.usExpData.image} alt="Generic placeholder image" /> : <Media object style={userImgStyle} src="http://www.gigabitmagazine.com/sites/default/files/styles/slider_detail/public/topic/image/GettyImages-1017193718_1.jpg?itok=W4-tjXij" /> }
            </Media>
            <Media body className="pl-4">
                <Media style={headerStyle} heading>
                    {props.usExpData.role}
                </Media>
                {props.usExpData.company}
                <br/>
                <div style={dateAreaStyle}>
                    <Moment format="YYYY/MM/DD">
                    {props.usExpData.startDate}
                    </Moment> 
                    -
                    {props.usExpData.endDate === null ? 
                        <Moment format="YYYY/MM/DD"> 
                            {now} 
                        </Moment> : 
                        <Moment format="YYYY/MM/DD"> 
                        {props.usExpData.endDate}
                        </Moment> 
                    }
                <br/>
                {props.usExpData.area && props.usExpData.area}
                <br/>
                <div style={{color: "black"}}>
                    {props.usExpData.description && props.usExpData.description}
                    </div>
                </div>
                <hr/>
            </Media>
            <div className="icon-profile-div">
                    <FontAwesomeIcon
                        onClick={setModal}
                        icon={faPencilAlt}
                    />
            </div>
            {modal && <ExperienceModal fetchExp={props.fetchExp} experience={props.usExpData} setModal={toggle}
            open={modal} />}
        </Media>
    );
}
 
export default CurrentExpirience;