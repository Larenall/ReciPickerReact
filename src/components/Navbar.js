import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router";
import "./Navbar.css";
import { userLogOut, getRecipes } from "../actions/index";

class Navbar extends Component {
  ShowDropdown = () => {
    var drop = document.querySelector(".dropdown-menu");
    drop.classList.toggle("show");
  };
  HideDropdown = () => {
    var drop = document.querySelector(".dropdown-menu");
    drop.classList.remove("show");
  };
  LogOut = () => {
    this.HideDropdown();
    this.props.history.replace("/");
    this.props.userLogOut();
  };
  GoToUsersRecipes = () => {
    this.HideDropdown();
    this.props.history.push("/recipes/mine");
  };
  GoToFavouriteRecipes = () => {
    this.HideDropdown();
    this.props.history.push("/recipes/favourite");
  };
  GoToRoles = () => {
    this.props.history.push("/roles");
  };
  GoToApprove = () => {
    this.props.history.push("/recipes/approve");
  };
  GoToMain = () => {
    this.props.history.push("/recipes");
  };

  render() {
    return (
      <nav>
        <div id="navbar">
          <div id="mainLogo" onClick={this.GoToMain}>
            <span>ReciPicker</span>
          </div>
          <button
            className="nav-btn"
            onClick={() => {
              document
                .querySelector("#recipeFormScreen.screen")
                .classList.add("open");
            }}
          >
            Add Recipe
          </button>
          {this.props.currentUser.role !== "user" ? (
            <button className="nav-btn" onClick={this.GoToApprove}>
              Approve recipes
            </button>
          ) : null}
          {this.props.currentUser.role === "admin" ? (
            <button className="nav-btn" onClick={this.GoToRoles}>
              Manage roles
            </button>
          ) : null}
        </div>
        <div
          id="user-info"
          className="btn-group"
          onMouseLeave={this.HideDropdown}
        >
          <div onClick={this.ShowDropdown} className="dropbtn">
            {this.props.currentUser.login.charAt(0).toUpperCase() +
              this.props.currentUser.login.slice(1)}
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={this.GoToUsersRecipes}>
              My recipes
            </div>
            <div className="dropdown-item" onClick={this.GoToFavouriteRecipes}>
              Favourite recipes
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" onClick={this.LogOut}>
              Log-out
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    currentUser: state.currentUser,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ userLogOut, getRecipes }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(Navbar)
);
