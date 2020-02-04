import React, {Component} from 'react'
import {Col, Row} from 'reactstrap';
import NewsFeedModal from "./NewsFeedModal"
import '../index.css'
import Api from "../API";

class NewsFeedAdd extends Component {
    state = {
        text: ""
    };

    save = () => {
        Api.fetch("/posts/", "POST", JSON.stringify({text: this.state.text})).then((res) => {
            if (res && res._id && this.state.selectedFile) {
                var formData = new FormData();
                formData.append("image", this.state.selectedFile);
                Api.request("/posts/" + res._id + "/picture", "POST", formData).then(() => this.props.refresh());
            } else this.props.refresh();
        });
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
                    </div>

                </Col>

            </Row>
        )
    }
}

export default NewsFeedAdd;