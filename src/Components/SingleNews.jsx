import React, {Component} from 'react';
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NewsFeedComments from './NewsFeedComments'
import Api from "../API";
import CommentModal from "./CommentModal";
import moment from "moment";
import NewsFeedEdit from "./NewsFeedEdit";
import '../index.css'
import { connect } from 'react-redux';

const mapStateToProps = state => state

class SingleNews extends Component {
    state = { 
      like: false
    }

    likedPost = async(news) => {
        await Api.fetch("/posts/likes/" + news._id, "POST");
        this.props.loadData()
        this.setState({
          like: !this.state.like
        })
    }
    componentDidMount = () => {
      let likes = this.props.news.likes
      console.log(likes)
      let user = likes.find(l => l.username === this.props.currentUser.username)
      if(user) {
        this.setState({
          like: true
        })
      }
    }
    render() { 
      console.log(this.props)
        return ( 
            <div className="new-post-container">
                        <ListGroup>
                          <ListGroupItem>
                            <div className="post-detail">
                                {this.props.user.image ? <div> 
                                    <img
                                  src={this.props.user.image}
                                  className="user-image"
                                  alt="news-img"
                                />
                              </div> :<div> 
                                    <img
                                  src='https://www.legalniewsieci.pl/!data/newsy/news_1982.jpg'
                                  className="user-image"
                                  alt="news-img"
                                />
                              </div> }  
                              <div className="details-container">
                                <div className="user-name">
                                  <Link to={"currentUserPage" + this.props.news.username}>
                                    {this.props.user.name} {this.props.user.surname}
                                  </Link>
                                </div>
                                <div className="user-title">
                                  {this.props.user.title} in {this.props.user.area}
                                </div>
                                <div className="post-age">
                                  {moment(this.props.news.createdAt).fromNow()}{" "}
                                  {this.props.news.isUpdated && (
                                    <span>
                                      - updated{" "}
                                      {moment(this.props.news.updatedAt).fromNow()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </ListGroupItem>
                          <ListGroupItem>{this.props.news.text}</ListGroupItem>
                          <ListGroupItem className="post-images">
                            <img
                              src={this.props.news.image}
                              className="posts-random-image"
                              alt={"image"}
                            />
                          </ListGroupItem>
                          <ListGroupItem>
                            <div className="post-age">
                              <div className="post-bottom-icons">
                                <div className="post-bottom-icons">
                                  <div className="post-bottom-icon-heart">
                                      {this.state.like ? <FontAwesomeIcon
                                        onClick={() => this.likedPost(this.props.news)}
                                        style={{ fontSize: "30px", color: "red" }}
                                        icon={faHeart}
                                      /> : <FontAwesomeIcon
                                      onClick={() => this.likedPost(this.props.news)}
                                      style={{ fontSize: "30px", color: "gray" }}
                                      icon={faHeart}
                                    />}
                                      <h5>{this.props.news.likesTotal}</h5>
                                  </div>
                                </div>
                                <div className="post-bottom-icons"></div>
                                <CommentModal
                                  postId={this.props.news._id}
                                  refresh={this.props.loadData}
                                />
                                <div className="post-bottom-icons">
                                  <div className="post-bottom-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      data-supported-dps="24x24"
                                      fill="currentColor"
                                      focusable="false"
                                    >
                                      <path d="M24 12a1.18 1.18 0 00-.36-.84L14 2v6h-3A10 10 0 001 18v4h1.87A6.11 6.11 0 019 16h5v6l9.63-9.14A1.18 1.18 0 0024 12zm-8 5.54V14H9a8.15 8.15 0 00-6 2.84A8 8 0 0111 10h5V6.48L21.81 12z"></path>
                                    </svg>
                                  </div>
                                  <div>Share</div>
                                </div>
                                <div className="post-bottom-spacer" />

                                {Api.USER === this.props.news.username && (
                                    <>
                                  <NewsFeedEdit
                                    news={this.props.news}
                                    refresh={this.loadData}
                                  />
                                <Button
                                  className="button-margin"
                                  size="sm"
                                  value="delete"
                                  onClick={() => this.props.deleteNewsfeed(this.props.news)}
                                >Delete post</Button>
                                </>
                                )}
                                  {" "}
                              </div>
                            </div>
                          </ListGroupItem>
                        </ListGroup>
                        <NewsFeedComments comments={this.props.news.comments} />
                      </div>
                
         );
    }
}
 
export default connect(mapStateToProps)(SingleNews);