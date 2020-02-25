import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Loader from 'react-loader-spinner';
import Api from "../API";
import '../index.css'
import NewsFeedAdd from "./NewsFeedAdd";
import SingleNews from './SingleNews'
import moment from "moment";
import { InfiniteScroll } from "react-simple-infinite-scroll";

class NewsFeed extends Component {
  state = {
    newsfeed: null,
    selectedNews: {},
    isLoading: true,
    items: [],
    cursor: 5
  };

  loadData = async () => {
    let resp = await Api.fetch('/posts', 'GET')
    let users = await Api.fetch('/profile', 'GET')
    console.log(resp)
    console.log(users)
    resp.map(post => {
      post.user = users.find(user => user.username === post.username);
      return post;
    });
    console.log(resp)
    resp.reverse();
    this.setState({
      newsfeed: resp,
      items: resp,
      isLoading: false
    });
  };

  likedPost = async(news) => {
    await Api.fetch("/posts/likes/" + news._id, "POST");
    this.loadData()
  }

  feedData = () => {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
        error: undefined,
        cursor: this.state.cursor
      });
      setTimeout(
        () =>
          this.setState(state => ({
            items: [
              ...state.items,
              ...this.state.newsfeed.slice(
                this.state.cursor,
                this.state.cursor + 5
              )
            ],
            cursor: this.state.cursor + 5,
            isLoading: false
          })),
        2000
      );
    }
  };

  componentDidMount = async () => {
    this.loadData();
  };

  resetUpdate() {
    this.setState({ selectedNews: {} });
  }

  deleteNewsfeed = async post => {
    await Api.fetch("/posts/" + post._id, "DELETE");
    var newsWithoutCurrent = this.state.newsfeed.filter(
      x => x._id !== post._id
    );
    this.setState({ newsfeed: newsWithoutCurrent });
    this.loadData();
  };
  updateNewsfeed = val => {
    let currentNews = this.state.selectedNews;
    currentNews[val.target.name] = val.target.value;
    this.setState({ selectedNews: currentNews });
  };

  showUpdatedNewsfeed = update => {
    if (update) {
      const index = this.state.newsfeed.findIndex(
        exp => this.state.selectedExp._id === exp._id
      );
      this.state.newsfeed[index] = { ...this.state.selectedExp };
    }
    this.resetUpdate();
  };

  render() {
    console.log(this.state)
    if (!this.state.newsfeed) return null;
    const allnews = [...this.state.newsfeed];
    allnews.map(news => {
      news.isUpdated =
        news.updatedAt &&
        moment(news.createdAt).format("HH:mm") !==
          moment(news.updatedAt).format("HH:mm");
    });
    return (
      <>
        <NewsFeedAdd refresh={this.loadData} />
        <Row>
          <Col>
            <div className="new-post-container">
              <h4>NEWS FEED</h4>
            </div>
            <div>
              <InfiniteScroll
                throttle={100}
                threshold={300}
                isLoading={this.state.isLoading}
                hasMore={!!this.state.cursor}
                onLoadMore={this.feedData}
              >
                {this.state.items.length > 0
                  && this.state.items.map(news => (
                  <SingleNews news={news} loadData={this.loadData} user={news.user} deleteNewsfeed={this.deleteNewsfeed} key={news._id}/>))}
              </InfiniteScroll>
              <div style={{ marginBottom: "20px" }}>
                {this.state.isLoading && <><Loader color="#007ACC" height={40} width={40} type="TailSpin" className="loader-profile-page"/> </>}
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default NewsFeed;
