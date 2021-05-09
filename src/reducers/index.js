import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import CurrentUserReducer from "./CurrentUserReducer";
import FiltersReducer from "./FiltersReducer";
import TokenReducer from "./TokenReducer";
import RecipesReducer from "./RecipesReducer";
import DetailsReducer from "./DetailsReducer";
import FavouriteReducer from "./FavouriteReducer";
import UsersReducer from "./UsersReducer";

const allReducers = combineReducers({
  currentUser: CurrentUserReducer,
  recipes: RecipesReducer,
  recipeDetails: DetailsReducer,
  filters: FiltersReducer,
  alert: AlertReducer,
  token: TokenReducer,
  userFavourite: FavouriteReducer,
  users: UsersReducer,
});

export default allReducers;
