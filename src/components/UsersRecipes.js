import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router";
import Filters from "./Filters";
import RecipeForm from "./RecipeForm.js";
import Navbar from "./Navbar";
import Recipes from "./Recipes";
import { clearAlerts } from "../actions/index";

const UsersRecipes = (props) => {
  const { clearAlerts } = props;
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  return (
    <React.Fragment>
      {props.user && props.token ? (
        <React.Fragment>
          <Navbar />
          <RecipeForm />
          <article>
            <Filters />
            <Recipes />
          </article>
        </React.Fragment>
      ) : (
        props.history.replace("/")
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
    user: state.user,
    token: state.token,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ clearAlerts }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(UsersRecipes)
);
