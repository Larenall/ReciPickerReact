import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import "./Filters.css";
import {
  getRecipes,
  getFilters,
  filterChecked,
  clearFilters,
  applyFilters,
} from "../actions/index";
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import wNumb from "wnumb";

const Filters = (props) => {
  var slider = document.getElementById("slider-tooltips");
  const { getFilters } = props;
  useEffect(() => {
    getFilters();
    noUiSlider.create(document.getElementById("slider-tooltips"), {
      start: [20, 120],
      snap: true,
      behaviour: "tap",
      connect: true,
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
      range: {
        min: 20,
        "20%": 40,
        "40%": 60,
        "60%": 80,
        "80%": 100,
        max: 120,
      },
    });
  }, [getFilters]);

  const onCheck = (e) => {
    var state = null;
    if (e.target.classList.contains("neutral")) {
      e.target.classList.toggle("neutral");
      e.target.classList.toggle("checked");
      state = true;
    } else if (e.target.classList.contains("checked")) {
      e.target.classList.toggle("checked");
      e.target.classList.toggle("unchecked");
      state = false;
    } else {
      e.target.classList.toggle("unchecked");
      e.target.classList.toggle("neutral");
    }
    props.filterChecked(
      e.target.parentElement.dataset.type,
      Number(e.target.id),
      state
    );
  };
  function onFilter() {
    var pos = [];
    var neg = [];
    var time = slider.noUiSlider.get().map((el) => Number(el));
    props.filters.forEach((t) =>
      t.filters.forEach((f) => {
        if (f.checked) {
          pos.push(f.filterID);
        } else if (f.checked === false) {
          neg.push(f.filterID);
        }
      })
    );
    props.getRecipes(pos, neg, time);
  }

  return (
    <div className="filters-sidebar">
      <div className="filterContainer">
        {props.filters?.map((el, idxEL) => (
          <React.Fragment key={idxEL}>
            <label key={idxEL + props.filters.length}>{el.type}</label>
            <div
              key={idxEL}
              id={idxEL}
              className="filter-box"
              data-type={el.type}
            >
              {el.filters.map((f) => (
                <div
                  className="custom-check neutral"
                  key={f.filterID}
                  id={f.filterID}
                  onClick={onCheck}
                >
                  {f.name}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
        <label>Coock time</label>
        <div id="slider-tooltips" />
      </div>
      <button
        type="button"
        className="btn btn-success filter-btn"
        onClick={onFilter}
      >
        Filter
      </button>
      <button
        type="button"
        className="btn btn-danger filter-btn"
        onClick={props.clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { getFilters, filterChecked, clearFilters, applyFilters, getRecipes },
    dispatch
  );
}
export default withRouter(
  connect(mapStateToProps, matchDispatchToProps)(Filters)
);
