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
import "./RecipesApproveDetails.css";

const RecipesApproveDetails = (props) => {
  const recipe = props.recipeDetails;

  const onEdit = (e) => {
    const textarea = e.target.closest("div").querySelector("textarea");
    const p = e.target;
    textarea.value = p.textContent;
    textarea.style.display = "block";
    textarea.style.height = p.offsetHeight + 10 + "px";
    p.style.display = "none";
  };
  const onEditDone = (e) => {
    const p = e.target.closest("div").querySelector("p");
    const textarea = e.target;
    p.textContent = textarea.value.split(" ").some((el) => el)
      ? textarea.value
      : "-";
    textarea.style.display = "none";
    p.style.display = "block";
  };
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
            <div>
              <b>Recipe info:</b>
              <p onClick={(e) => onEdit(e)}>{recipe?.info}</p>
              <textarea
                onMouseLeave={(e) => {
                  onEditDone(e);
                }}
              ></textarea>
            </div>
            <div>
              <b>Coocking method: </b>
              <p onClick={(e) => onEdit(e)}>{recipe?.method}</p>
              <textarea
                onMouseLeave={(e) => {
                  onEditDone(e);
                }}
              ></textarea>
            </div>
            <div>
              <b>Coocking time: </b>
              <p onClick={(e) => onEdit(e)}>{recipe?.time} minutes</p>
              <textarea
                onMouseLeave={(e) => {
                  onEditDone(e);
                }}
              ></textarea>
            </div>
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
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(RecipesApproveDetails);
