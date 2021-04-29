import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router";
import "./Navbar.css";
import { userLogOut } from "../actions/index";

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
    this.props.history.replace("/");
  };
  GoToUsersRecipes = () => {
    this.props.history.push("/recipes/my");
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
        </div>
        <div
          id="user-info"
          className="btn-group"
          onMouseLeave={this.HideDropdown}
        >
          <div onClick={this.ShowDropdown} className="dropbtn">
            {this.props.user.login.charAt(0).toUpperCase() +
              this.props.user.login.slice(1)}
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={this.GoToUsersRecipes}>
              My recipes
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
    user: state.user,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ userLogOut }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(Navbar)
);
