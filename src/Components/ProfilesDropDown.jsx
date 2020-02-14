import React from "react";
import Loader from "react-loader-spinner";
import UsersList from "./UsersList";
import SearchedUsers from "./SearchedUsers";
import { connect } from "react-redux";
import Api from '../API'
import "../main.css";
let loaderStyle = {
  position: "relative",
  left: "40%"
};

const mapStateToProps = state => state;

class ProfilesDropDown extends React.Component {
  state = {
    loading: true,
    users: []
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <>
            <Loader
              color="#007ACC"
              height={40}
              width={40}
              type="TailSpin"
              style={loaderStyle}
            />{" "}
          </>
        ) : this.props.searchQuery ? 
        this.props.searchQuery.map((u,i) => (
            <SearchedUsers
            key={i}
            userSearch={u}
            toogleDropdown={this.props.toggleProfileDropdown}
            onClick={this.props.toggleProfileDropdown}
          />
        ))
         : this.state.users ? (
          this.state.users.map((u, i) => (
            <UsersList
              user={u}
              key={i}
              onClick={this.props.toggleProfileDropdown}
              toogleDropdown={this.props.toggleProfileDropdown}
            />
          ))
        ) : (
          <h4>No users. Try again later</h4>
        )}
      </>
    );
  }
  fetchUsers = async() => {
    let username = localStorage.getItem('username')
    let response = await Api.fetch("/profile", "GET");
    let users = response.filter(resp => resp.username !== username)
    this.setState({
      users: users
    })
    console.log(users)
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loading: true
      });
      this.fetchUsers()
      this.setState({
        loading: false
      });
    }, 1000);
  };
}

export default connect(mapStateToProps)(ProfilesDropDown);
