export default function FiltersReducer(filters = [], action) {
  switch (action.type) {
    case "SETFILTERS":
      return action.payload;
    case "FILTERCHECKED":
      var typeIndex = filters.findIndex(
        (el) => el.type === action.payload.type
      );
      var filterIndex = filters[typeIndex].filters.findIndex(
        (f) => f.filterID === action.payload.id
      );
      filters[typeIndex].filters[filterIndex].checked = action.payload.state;
      return filters;
    case "CLEARFILTERS":
      filters.forEach((g) => g.filters.map((el) => (el.checked = null)));
      var filtersClasses = document.querySelectorAll(
        ".filters-sidebar .custom-check"
      );
      filtersClasses.forEach((el) => {
        el.classList.remove("checked");
        el.classList.remove("unchecked");
        el.classList.add("neutral");
      });
      return filters;
    case "APPLYFILTERS":
      return filters;
    default:
      return filters;
  }
}
