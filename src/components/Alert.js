import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn/SignIn.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeAlert } from "../actions/index";

class Alert extends Component {
  getAlertClass(clr = "red") {
    if (clr === "green") {
      return "success";
    } else if (clr === "red") {
      return "danger";
    }
  }
  render() {
    return (
      <div className="alertRoot">
        {this.props.alert?.map((al, idx) => {
          return (
            <div
              key={idx}
              className={"alert alert-" + this.getAlertClass(al.clr)}
              role="alert"
              onClick={() => this.props.closeAlert(idx)}
            >
              <b>{al.subj}</b>
              <span> {al.msg}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    alert: state.alert,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ closeAlert }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Alert);
