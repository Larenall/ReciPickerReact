import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./RecipeForm.css";
import { getRecipes, addAlert, clearAlerts } from "../actions/index";

var filtersLocal;
class RecipeForm extends Component {
  renderImg() {
    var img = document.querySelector("#formImg");
    img.src = document.querySelector("#imgUrl").value
      ? document.querySelector("#imgUrl").value
      : "https://149363561.v2.pressablecdn.com/wp-content/uploads/placeholder-column-bg-image.png";
  }
  onCheck = (e) => {
    filtersLocal = this.props.filters;
    var state = null;
    if (e.target.classList.contains("neutral")) {
      e.target.classList.toggle("neutral");
      e.target.classList.toggle("checked");
      state = true;
    } else if (e.target.classList.contains("checked")) {
      e.target.classList.toggle("checked");
      e.target.classList.toggle("neutral");
      state = null;
    }
    var typeIndex = filtersLocal.findIndex(
      (el) => el.type === e.target.parentElement.dataset.type
    );
    var filterIndex = filtersLocal[typeIndex].filters.findIndex(
      (f) => f.filterID === Number(e.target.id)
    );
    filtersLocal[typeIndex].filters[filterIndex].checked = state;
  };
  onSubmit = async (e) => {
    this.props.clearAlerts();
    var imgUrl = document.querySelector("#formImg").src;
    var name = document.querySelector("#recipeName").value;
    var time = Number(document.querySelector("#coockTime").value);
    var desc = document.querySelector("#recipeDesc").value;
    var ingr = document.querySelector("#recipeIngr").value;
    var filtersData = [];
    var combinedFltrs = filtersLocal.map((el) =>
      el.filters.filter((f) => f.checked != null)
    );
    filtersLocal.forEach((el) =>
      el.filters.forEach(function (fltr) {
        if (combinedFltrs.some((k) => k === fltr));
        filtersData.push({ type: el.type, filters: fltr });
      })
    );
    filtersData = filtersData.filter((el) => el.filters.checked !== null);
    if (
      name &&
      imgUrl !==
        "https://149363561.v2.pressablecdn.com/wp-content/uploads/placeholder-column-bg-image.png" &&
      desc &&
      ingr &&
      filtersData.length !== 0 &&
      time !== 0
    ) {
      var data = {
        userID: this.props.user?.id ?? 0,
        name: name,
        imgUrl: imgUrl,
        time: time <= 20 || isNaN(time) ? 20 : time,
        recipeDescr: desc,
        recipeIngr: ingr,
        filters: filtersData,
      };
      this.props.addAlert("Submitted", "successfully", "green");
      await fetch("https://localhost:5001/api/Recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.token,
        },
        body: JSON.stringify(data),
      });
      document.querySelector(".screen").classList.remove("open");
      this.props.getRecipes();
      return;
    }
    this.props.addAlert("Fields", "can`t be empty");
  };

  render() {
    filtersLocal = this.props.filters;
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
          <form id="recipeForm">
            <div className="form">
              <div className="row">
                <div className="col ">
                  <img
                    id="formImg"
                    alt=""
                    onError={() => {
                      document.querySelector(
                        "#formImg"
                      ).src = `https://149363561.v2.pressablecdn.com/wp-content/uploads/placeholder-column-bg-image.png`;
                    }}
                    src="https://149363561.v2.pressablecdn.com/wp-content/uploads/placeholder-column-bg-image.png"
                  />
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-7">
                      <input
                        type="text"
                        id="recipeName"
                        className="form-control form-control-lg mb-3"
                        placeholder="Recipe name"
                      />
                    </div>
                    <div className="col">
                      <input
                        id="coockTime"
                        type="text"
                        className="form-control form-control-lg mb-3"
                        placeholder="Coock time(minutes)"
                      />
                    </div>
                  </div>
                  <input
                    id="imgUrl"
                    onChange={this.renderImg}
                    type="text"
                    className="form-control form-control-lg mb-3"
                    placeholder="Recipe image link"
                  />
                  <textarea
                    className="form-control form-control-lg mb-3"
                    id="recipeDesc"
                    rows="5"
                    placeholder="Short recipe description"
                  ></textarea>
                  <textarea
                    className="form-control form-control-lg"
                    id="recipeIngr"
                    rows="5"
                    placeholder="Ingredients"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-filters-container">
              {this.props.filters?.map((el, idxEL) => (
                <div key={idxEL} className="filter-box" data-type={el.type}>
                  {el.filters.map((f) => (
                    <div
                      className="custom-check neutral"
                      key={f.filterID}
                      id={f.filterID}
                      onClick={this.onCheck}
                    >
                      {f.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={this.onSubmit}
              className="btn btn-success btn-lg btn-block btn-submit"
            >
              Submit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    filters: state.filters,
    token: state.token,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addAlert, clearAlerts, getRecipes }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(RecipeForm);
