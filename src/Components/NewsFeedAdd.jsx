import React, {Component} from 'react'
import {Col, Row} from 'reactstrap';
import NewsFeedModal from "./NewsFeedModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faCamera  } from '@fortawesome/free-solid-svg-icons'
import '../index.css'
import Api from "../API";

class NewsFeedAdd extends Component {
    state = {
        text: "",
        selectedFile: null
    };

    save = async() => {
        // Api.fetch("/posts/", "POST", JSON.stringify({text: this.state.text})).then((res) => {
        //     if (res && res._id && this.state.selectedFile) {
        //         var formData = new FormData();
        //         formData.append("image", this.state.selectedFile);
        //         Api.request("/posts/" + res._id + "/picture", "POST", formData).then(() => this.props.refresh());
        //     } else this.props.refresh();
        // });
        // const token = localStorage.getItem('token')
        // const username = localStorage.getItem('username')
        // console.log(username)
        // console.log(token)
        console.log(this.state.text)
        let resp = await Api.fetch('/posts/' + localStorage.getItem('username'), 'POST', JSON.stringify({text: this.state.text}), 'application/json')
        if(resp) {
            const formData = new FormData();
            formData.append("image", this.state.selectedFile);
            console.log(this.state.selectedFile)
            let response = await Api.fetch('/posts/' + resp._id + '/picture', "POST", formData)
            if(response){
                console.log('good job')
                this.props.refresh();
            }
        } else{
            console.log('loch')
            this.props.refresh();
        }
    };

    updateFeed = (name, newText) => {
        this.setState({[name]: newText})
    };

    render() {
        return (
            <Row>
                <Col sm="12">

                    <div className="display-flex bodyNewsFeed">
                        <NewsFeedModal updateFeed={this.updateFeed} save={this.save}/>
                        <button className="share-box_trigger share-box_trigger1">
                            <FontAwesomeIcon onClick={this.something} className="exit-btn-chatroom" icon={faVideo} />
                        </button>
                        <button className="share-box_trigger share-box_trigger1">
                            <FontAwesomeIcon onClick={this.something} className="exit-btn-chatroom" icon={faCamera} />
                        </button>

                    </div>

                </Col>

            </Row>
        )
    }
}

export default NewsFeedAdd;
