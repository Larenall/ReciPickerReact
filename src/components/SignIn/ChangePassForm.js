import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./ChangePassFrom.css";
import { addAlert, clearAlerts, changeUserPassword } from "../../actions/index";
import { customToggleClass, showPass } from "./SignIn.js";

class ChangePassForm extends Component {
  onChangePass = () => {
    this.props.clearAlerts();
    const login = document.querySelector("div#changePassForm #UserLogin");
    const email = document.querySelector("div#changePassForm #UserEmail");
    const password = document.querySelector("div#changePassForm #NewPass");
    const loginNotEmpty = login.value.length !== 0;
    const emailNotEmpty = email.value.length !== 0;
    const PassIsCorrect = this.checkPass(password);
    const ConfirmPassIsCorrect = this.checkConfirmPass(password);
    if (!loginNotEmpty) {
      this.props.addAlert("Login", "can`t be empty");
      customToggleClass(login, "is-invalid");
    }
    if (!emailNotEmpty) {
      this.props.addAlert("E-mail", "can`t be empty");
      customToggleClass(email, "is-invalid");
    }
    if (
      loginNotEmpty &&
      emailNotEmpty &&
      PassIsCorrect &&
      ConfirmPassIsCorrect
    ) {
      this.props.changeUserPassword(
        {
          Login: login.value,
          Email: email.value,
          Password: password.value,
        },
        this.props.history
      );
    }
  };
  checkConfirmPass = (password) => {
    const changeConfirm = document.querySelector(
      "div#changePassForm #ConfrimNewPass"
    );
    if (password.value === changeConfirm.value) {
      if (!password.classList.contains("is-invalid")) {
        customToggleClass(changeConfirm, "is-valid");
        return true;
      }
      return false;
    }
    customToggleClass(changeConfirm, "is-invalid");
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
  render() {
    return (
      <React.Fragment>
        <div
          className="screen"
          onClick={(e) => {
            if (e.target.classList.contains("screen")) {
              document.querySelector(".screen").classList.remove("open");
            }
          }}
        >
          <div id="changePassForm">
            <b className="mb-3">
              To reset your password please enter following information.
            </b>
            <input
              type="text"
              id="UserLogin"
              className="form-control form-control-lg mb-3"
              placeholder="Login"
            />
            <input
              type="text"
              id="UserEmail"
              className="form-control form-control-lg mb-3"
              placeholder="Email"
            />

            <div className="input-group input-group-lg mb-3">
              <input
                id="NewPass"
                type="password"
                placeholder="New password"
                autoComplete="off"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="form-control "
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary "
                  type="button"
                  onClick={showPass}
                >
                  Show
                </button>
              </div>
            </div>
            <div className="input-group input-group-lg">
              <input
                id="ConfrimNewPass"
                type="password"
                autoComplete="off"
                placeholder="Confirm password"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="form-control"
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary "
                  type="button"
                  onClick={showPass}
                >
                  Show
                </button>
              </div>
            </div>
            <button
              className="btn btn-success mt-2 btn-lg"
              onClick={this.onChangePass}
            >
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.token,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { changeUserPassword, addAlert, clearAlerts },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(ChangePassForm);
