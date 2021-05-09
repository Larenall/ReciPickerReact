import React from "react";
import "./Recipe.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./RecipeDetails.css";
import {
  addFavouriteToServer,
  removeFavouriteFromServer,
} from "../actions/index";
import { svgFormat, dateFormat } from "./Recipes";

const RecipeDetails = (props) => {
  const recipe = props.recipeDetails;
  const formatFavourite = (recipeId) => {
    if (props.userFavourite.includes(recipeId)) {
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.removeFavouriteFromServer(recipeId)}
        >
          Remove from favourites
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-info"
          onClick={() => props.addFavouriteToServer(recipeId)}
        >
          Add to favourites
        </button>
      );
    }
  };
  return (
    <div
      id="recipeDetailsScreen"
      className="screen"
      onClick={(e) => {
        if (e.target.classList.contains("screen")) {
          document
            .querySelector("#recipeDetailsScreen.screen")
            .classList.remove("open");
        }
      }}
    >
      <div id="recipeDetails">
        <div className="row">
          <div className="col">
            <img alt="" src={recipe?.imgUrl} />
          </div>
          <div className="col">
            <b>Recipe info: </b> {recipe?.info}
            <div>
              <b>Coocking method: </b> {recipe?.method}
            </div>
            <b>Coocking time: </b> {recipe?.time}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <b>Name: </b>
            {recipe?.name + "  "}
            {svgFormat(recipe?.isApproved, 30)}&nbsp;
            {formatFavourite(recipe?.recipeId)}
          </div>
          <div className="col">
            <b>Added: </b>
            {dateFormat(recipe?.addDate)}
          </div>
        </div>
        <hr />
        <b>Tags: </b>
        <div className="details-filters-container">
          {props.filters.map((t) =>
            t.filters
              .filter((f) => recipe?.filters?.includes(f.filterID))
              .map((f) => (
                <div
                  className="custom-check checked"
                  key={f.filterID}
                  id={f.filterID}
                >
                  {f.name}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
    recipeDetails: state.recipeDetails,
    userFavourite: state.userFavourite,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { addFavouriteToServer, removeFavouriteFromServer },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(RecipeDetails);
