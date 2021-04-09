import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import UserReducer from "./UserReducer";
import FiltersReducer from "./FiltersReducer";
import TokenReducer from "./TokenReducer";
import RecipesReducer from "./RecipesReducer";

const allReducers = combineReducers({
  user: UserReducer,
  recipes: RecipesReducer,
  filters: FiltersReducer,
  alert: AlertReducer,
  token: TokenReducer,
});

export default allReducers;
