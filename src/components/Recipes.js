import React, { useEffect } from "react";
import "./Recipe.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRecipes } from "../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Recipes = (props) => {
  const { getRecipes } = props;
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const dateFormat = (date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = Date.now();
    const addDate = new Date(date);

    var diff = Math.round(Math.abs((today - addDate) / oneDay));

    if (diff > 30) {
      diff = Math.round(diff / 30);
      if (diff > 12) {
        return Math.round(diff / 12) === 1
          ? Math.round(diff / 12) + " рік тому"
          : Math.round(diff / 12) + " роки тому";
      }
      return diff === 1 ? diff + " місяць тому" : diff + " місяці тому";
    }
    return diff <= 4
      ? diff === 1
        ? diff + " день тому"
        : diff + " дні тому"
      : diff + " днів тому";
  };
  const svgFormat = (approved) => {
    return approved ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
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
        height="20"
        fill="#c7003b"
        className="bi bi-bookmark-dash"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
        />
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
      </svg>
    );
  };
  const getDetails = (id) => {
    var recipe = props.recipes.filter((r) => r.recipeId === id)[0];
    console.log(recipe.info, recipe.method);
  };
  return (
    <div id="recipes">
      {props.recipes?.map((el) => {
        return (
          <div
            className="recipe"
            key={el.recipeId}
            id={el.recipeId}
            onClick={() => getDetails(el.recipeId)}
          >
            <img alt="" src={el.imgUrl} />
            <p>
              {el.name + "  "}
              {svgFormat(el.approved)}
            </p>
            <p color="#a8a8a8">{dateFormat(el.addDate)}</p>
            <div className="recipe-filters-container">
              {props.filters.map((t) =>
                t.filters
                  .filter((f) => el.filters?.includes(f.filterID))
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
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
    recipes: state.recipes,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getRecipes }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Recipes);
