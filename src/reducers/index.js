import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import UserReducer from "./UserReducer";
import FiltersReducer from "./FiltersReducer";
import TokenReducer from "./TokenReducer";
import RecipesReducer from "./RecipesReducer";
import DetailsReducer from "./DetailsReducer";
import FavouriteReducer from "./FavouriteReducer";

const allReducers = combineReducers({
  user: UserReducer,
  recipes: RecipesReducer,
  recipeDetails: DetailsReducer,
  filters: FiltersReducer,
  alert: AlertReducer,
  token: TokenReducer,
  userFavourite: FavouriteReducer,
});

export default allReducers;
