import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";
import Login from "./Login";
import Register from "./Register";
import { sendRegData } from "../../actions/index";
import { withRouter } from "react-router";

const SignIn = ({ props }) => {
  return (
    <div className="SignIn">
      <Login />
      <div className="verticalLine"></div>
      <Register />
    </div>
  );
};

export function showPass(e) {
  var input = e.target.parentNode.parentNode.querySelector("input");
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}
export function changeFocus(e) {
  const login = document.querySelector(".login");
  const register = document.querySelector(".register");
  if (login.contains(e.target)) {
    login.style.marginLeft = "20vw";
  }
  if (register.contains(e.target)) {
    login.style.marginLeft = "-20vw";
  }
  e.preventDefault();
}
export function customToggleClass(el, classToToggle) {
  switch (classToToggle) {
    case "is-valid":
      el.classList.remove("is-invalid");
      el.classList.add("is-valid");
      return;
    case "is-invalid":
      el.classList.remove("is-valid");
      el.classList.add("is-invalid");
      return;
    default:
      return;
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert,
    user: state.user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ sendRegData }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(SignIn)
);
