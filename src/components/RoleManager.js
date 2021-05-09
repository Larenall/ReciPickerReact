import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router";
import RecipeForm from "./RecipeForm.js";
import Navbar from "./Navbar";
import { clearAlerts } from "../actions/index";
import Roles from "../components/Roles";

const RoleManager = (props) => {
  const { clearAlerts } = props;
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  return (
    <React.Fragment>
      {props.currentUser && props.token ? (
        <React.Fragment>
          <Navbar />
          <RecipeForm />
          <Roles />
        </React.Fragment>
      ) : (
        props.history.replace("/")
      )}
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    token: state.token,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ clearAlerts }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(RoleManager)
);
