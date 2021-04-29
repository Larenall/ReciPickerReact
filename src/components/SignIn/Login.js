import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendLogData, addAlert, clearAlerts } from "../../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";
import { customToggleClass, showPass, changeFocus } from "./SignIn";
import { withRouter } from "react-router";

class Login extends Component {
  onLogin = () => {
    this.props.clearAlerts();
    const loginOrEmail = document.querySelector("form.login #userLogin");
    const pass = document.querySelector("form.login #userPass");
    const loginNotEmpty = loginOrEmail.value.length !== 0;
    const passNotEmpty = pass.value.length !== 0;
    if (!loginNotEmpty) {
      this.props.addAlert("Login/E-mail", "can`t be empty");
      customToggleClass(loginOrEmail, "is-invalid");
    }
    if (!passNotEmpty) {
      this.props.addAlert("Password", "can`t be empty");
      customToggleClass(pass, "is-invalid");
    }
    if (loginNotEmpty && passNotEmpty) {
      this.props.sendLogData(
        {
          loginOrEmail: loginOrEmail.value,
          password: pass.value,
        },
        this.props.history
      );
    }
  };

  render() {
    return (
      <form className="login input-group-lg" onClick={changeFocus}>
        <input
          placeholder="Login/E-mail"
          id="userLogin"
          type="text"
          autoComplete="off"
          className="form-control"
        ></input>
        <div className="input-group input-group-lg">
          <input
            id="userPass"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
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
        <button className="btn btn-primary mt-2 btn-lg" onClick={this.onLogin}>
          Login
        </button>
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            document.querySelector(".screen").classList.add("open");
          }}
        >
          Forgot password?
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert,
  };
}
const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ sendLogData, addAlert, clearAlerts }, dispatch);
};
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(Login)
);
