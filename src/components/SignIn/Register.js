import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendRegData, addAlert, clearAlerts } from "../../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";
import { customToggleClass, showPass, changeFocus } from "./SignIn";
import { withRouter } from "react-router";

class Register extends Component {
  tryRegister = () => {
    this.props.clearAlerts();
    const login = document.querySelector("#registerLogin");
    const email = document.querySelector("#registerEmail");
    const password = document.querySelector("#registerPass");
    const loginIsCorrect = this.checkLogin(login);
    const EmailIsCorrect = this.checkEmail(email);
    const PassIsCorrect = this.checkPass(password);
    const ConfirmPassIsCorrect = this.checkConfirmPass(password);
    if (
      loginIsCorrect &&
      EmailIsCorrect &&
      PassIsCorrect &&
      ConfirmPassIsCorrect
    ) {
      const userData = {
        login: login.value,
        email: email.value,
        password: password.value,
      };
      this.props.sendRegData(userData, this.props.history);
    }
  };
  checkLogin = (login) => {
    const re = /^\w{1,16}$/;
    if (login.value.length !== 0) {
      if (re.test(login.value)) {
        customToggleClass(login, "is-valid");
        return true;
      } else {
        customToggleClass(login, "is-invalid");
        this.props.addAlert("Login", "is incorrect");
        return false;
      }
    }
    customToggleClass(login, "is-invalid");
    this.props.addAlert("Login", "can`t be empty");
    return false;
  };
  checkConfirmPass = (password) => {
    const registerConfirm = document.querySelector("#registerConfirm");
    if (password.value === registerConfirm.value) {
      if (!password.classList.contains("is-invalid")) {
        customToggleClass(registerConfirm, "is-valid");
        return true;
      }
      return false;
    }
    customToggleClass(registerConfirm, "is-invalid");
    this.props.addAlert("Password", "doesnt match");
    return false;
  };
  checkPass = (password) => {
    const re = /^\w{8,16}$/;
    if (password.value.length !== 0) {
      if (re.test(password.value)) {
        customToggleClass(password, "is-valid");
        return true;
      } else {
        customToggleClass(password, "is-invalid");
        this.props.addAlert("Password", "is incorrect");
        return false;
      }
    }
    customToggleClass(password, "is-invalid");
    this.props.addAlert("Password", "can`t be empty");
    return false;
  };

  checkEmail = (email) => {
    const re = /(.+)@(.+){2,}\.(.+){2,}/;
    if (email.value.length !== 0) {
      if (re.test(email.value)) {
        customToggleClass(email, "is-valid");
        return true;
      } else {
        customToggleClass(email, "is-invalid");
        this.props.addAlert("E-mail", "is incorrect");
        return false;
      }
    }
    customToggleClass(email, "is-invalid");
    this.props.addAlert("E-mail", "can`t be empty");
    return false;
  };
  render() {
    return (
      <form className="register input-group-lg" onClick={changeFocus}>
        <input
          placeholder="Login"
          id="registerLogin"
          type="text"
          className="form-control"
        ></input>
        <input
          placeholder="E-mail"
          id="registerEmail"
          autoComplete="off"
          type="text"
          className="form-control mt-2"
        ></input>
        <div className="input-group input-group-lg">
          <input
            id="registerPass"
            type="password"
            placeholder="Password"
            autoComplete="off"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            className="form-control mt-2"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary mt-2"
              type="button"
              onClick={showPass}
            >
              Show
            </button>
          </div>
        </div>
        <div className="input-group input-group-lg">
          <input
            id="registerConfirm"
            type="password"
            autoComplete="off"
            placeholder="Confirm password"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            className="form-control mt-2"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary mt-2"
              type="button"
              onClick={showPass}
            >
              Show
            </button>
          </div>
        </div>
        <button
          className="btn btn-warning mt-2 btn-lg"
          onClick={this.tryRegister}
        >
          Register
        </button>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    alert: state.alert,
    ownProps,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ sendRegData, addAlert, clearAlerts }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(Register)
);
