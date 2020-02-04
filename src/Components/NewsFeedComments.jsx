import React, {Component} from 'react';
import Api from "../API";
import moment from "moment";
import { ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";
import EditComment from "./EditComment";
import '../index.css'

class NewsFeedComments extends Component {
    state = {
        comments: null,
        selectedComment: {},
        isLoading: true,
        items: [],
        cursor: 5
    };

    constructor() {
        super();
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editComment = this.editComment.bind(this);
    }


    handleFieldChange = event => {
        const {value, name} = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const data = {
            comment: this.state.comment.message,
            rate: this.state.rating,
            elementId: this.props.comment
        };
    }

    loadData = async () => {
        const comments = await Api.fetch('/posts/');
        const users = await Api.fetch('/profile/');
        comments.map(post => {
            post.user = users.find(user => user.username === post.username);
            return post;
        });
        comments.reverse();
        this.setState({
            comments: comments,
            items: comments.slice(0, 5),
            isLoading: false
        });
    };

    feedData = () => {
        if (!this.state.isLoading) {
            this.setState({isLoading: true, error: undefined, cursor: this.state.cursor});
            setTimeout(() => this.setState(state => ({
                items: [...state.items, ...(this.state.newsfeed.slice(this.state.cursor, this.state.cursor + 5))],
                cursor: this.state.cursor + 5,
                isLoading: false
            })), 2000);
        }
    };

    componentDidMount = async () => {
        this.loadData();
    };

    resetUpdate() {
        this.setState({selectedComments: {}});
    }


    updateComments = (e, comments) => {
        console.log(e.target);
        var formData = new FormData();
        formData.append("post", e.target.files[0]);
        Api.request("/posts/" + comments._id, "POST", formData);
        this.loadData();
    };


    showUpdatedComments = (update) => {
        if (update) {
            const index = this.state.comments.findIndex((exp) => this.state.selectedExp._id === exp._id);
            this.state.comments[index] = {...this.state.selectedExp};
        }
        this.resetUpdate();
    };

    editComment(id) {
        const c = this.state.comments.find((comment) => id.currentTarget.name === comment._id);
        if (c) {
            const editComment = JSON.parse(JSON.stringify(c));
            editComment.message = editComment.comment;
            this.setState({comment: editComment, rating: editComment.rate});
        }

    }

    render() {
        return <div>
            {this.props.comments && this.props.comments
                .map((comment) =>
                    <div style={{margin: '15px'}}>
                    <ListGroup>
                        <ListGroupItem color="success">
                            <div className="comment-detail">
                                <div>
                                    <img src={comment.postedBy.profile.image} className="comment-image" alt='comment-img'/>
                                </div>
                                <div className="details-container">
                                    <div
                                        className="comment-user-name"><Link
                                        to={'users/' + comment.username}>{comment.postedBy.profile.name} {comment.postedBy.profile.surname}</Link>
                                    </div>
                                    <div
                                        className="comment-user-title">{comment.postedBy.profile.title} in {comment.postedBy.profile.area}</div>
                                    <div
                                        className="comment-post-age">{moment(comment.createdAt).fromNow()} {comment.isUpdated &&
                                    <span>- updated {moment(comment.updatedAt).fromNow()}</span>}</div>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem color="success">
                            <div className="comment-text">{comment.comment}</div>
                            {(Api.USER === comment.username) &&
                            <EditComment comment={comment} refresh={this.loadData}/>}
                        </ListGroupItem>
                    </ListGroup>
                    </div>
                )}
        </div>
    }
}

export default NewsFeedComments;