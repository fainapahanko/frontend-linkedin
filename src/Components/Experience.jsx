import React from 'react';
import { Media } from 'reactstrap';
import Moment from 'react-moment';

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

const Experience = (props) => {
    console.log(props)
    const now = new Date()
    return ( 
        <Media className="my-5">
            <Media left href="#">
                {props.experience.image ? <Media style={userImgStyle} object src={props.experience.image} alt="Generic placeholder image" /> : <Media object style={userImgStyle} src="http://www.gigabitmagazine.com/sites/default/files/styles/slider_detail/public/topic/image/GettyImages-1017193718_1.jpg?itok=W4-tjXij" /> }
            </Media>
            <Media body className="pl-4">
                <Media style={headerStyle} heading>
                    {props.experience.role}
                </Media>
                {props.experience.company}
                <br/>
                <div style={dateAreaStyle}>
                    <Moment format="YYYY/MM/DD">
                    {props.experience.startDate}
                    </Moment> 
                    -
                    {props.experience.endDate === null ? 
                        <Moment format="YYYY/MM/DD"> 
                            {now} 
                        </Moment> : 
                        <Moment format="YYYY/MM/DD"> 
                        {props.experience.endDate}
                        </Moment> 
                    }
                <br/>
                {props.experience.area && props.experience.area}
                <br/>
                <div style={{color: "black"}}>
                    {props.experience.description && props.experience.description}
                    </div>
                </div>
                <hr/>
            </Media>
        </Media>
    );
}
 
export default Experience;