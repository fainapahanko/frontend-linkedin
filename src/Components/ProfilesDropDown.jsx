import React from "react";
import Loader from "react-loader-spinner";
import UsersList from "./UsersList";
import SearchedUsers from "./SearchedUsers";
import { connect } from "react-redux";
import "../main.css";
let loaderStyle = {
  position: "relative",
  left: "40%"
};

const mapStateToProps = state => state;

class ProfilesDropDown extends React.Component {
  state = {
    loading: true
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
         : this.props.users ? (
          this.props.users.map((u, i) => (
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
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loading: true
      });
      this.setState({
        loading: false
      });
    }, 1000);
  };
}

export default connect(mapStateToProps)(ProfilesDropDown);
