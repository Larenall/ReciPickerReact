import React from "react";
import "./Recipe.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./RecipeDetails.css";
import {
  addFavouriteToServer,
  removeFavouriteFromServer,
  updateRecipe,
} from "../actions/index";
import { dateFormat } from "./Recipes";
import "./RecipesApproveDetails.css";

const RecipesApproveDetails = (props) => {
  const svgFormat = (approved, size) => {
    return approved ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        fill="#4b8b3b"
        className="bi bi-bookmark-check-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        fill="#c7003b"
        className="bi bi-bookmark-dash"
        viewBox="0 0 16 16"
        onClick={(e) => {
          approveRecipe(e);
        }}
      >
        <path
          fillRule="evenodd"
          d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
        />
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
      </svg>
    );
  };
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
    props.updateRecipe(p.dataset.type, p.textContent);
  };
  const approveRecipe = (e) => {
    props.updateRecipe("isApproved", true);
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
            <img alt="" src={props.recipeDetails.imgUrl} />
          </div>
          <div className="col">
            <div>
              <b>Recipe info:</b>
              <p onClick={(e) => onEdit(e)} data-type="info">
                {props.recipeDetails.info}
              </p>
              <textarea
                onMouseLeave={(e) => {
                  onEditDone(e);
                }}
              ></textarea>
            </div>
            <div>
              <b>Coocking method: </b>
              <p onClick={(e) => onEdit(e)} data-type="method">
                {props.recipeDetails.method}
              </p>
              <textarea
                onMouseLeave={(e) => {
                  onEditDone(e);
                }}
              ></textarea>
            </div>
            <div>
              <b>Coocking time(minutes): </b>
              <p onClick={(e) => onEdit(e)} data-type="time">
                {props.recipeDetails.time}
              </p>
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
            {props.recipeDetails.name + "  "}
            {svgFormat(props.recipeDetails.isApproved, 30)}&nbsp;
            {formatFavourite(props.recipeDetails.recipeId)}
          </div>
          <div className="col">
            <b>Added: </b>
            {dateFormat(props.recipeDetails.addDate)}
          </div>
        </div>
        <hr />
        <b>Tags: </b>
        <div className="details-filters-container">
          {props.filters.map((t) =>
            t.filters
              .filter((f) => props.recipeDetails.filters?.includes(f.filterID))
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
    { addFavouriteToServer, removeFavouriteFromServer, updateRecipe },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(RecipesApproveDetails);
