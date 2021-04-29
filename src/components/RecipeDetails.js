import React from "react";
import "./Recipe.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./RecipeDetails.css";
import { svgFormat, dateFormat } from "./Recipes";

const RecipeDetails = (props) => {
  const recipe = props.recipeDetails;
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
            <img alt="" src={recipe.imgUrl} />
          </div>
          <div className="col">
            <b>Recipe info: </b> {recipe.info}
            <div>
              <b>Coocking method: </b> {recipe.method}
            </div>
            <p>{recipe.time}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {recipe.name + "  "}
            {svgFormat(recipe.isApproved, 30)}
          </div>
          <div className="col">{dateFormat(recipe.addDate)}</div>
        </div>
        <div className="details-filters-container">
          {props.filters.map((t) =>
            t.filters
              .filter((f) => recipe.filters?.includes(f.filterID))
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
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(RecipeDetails);
