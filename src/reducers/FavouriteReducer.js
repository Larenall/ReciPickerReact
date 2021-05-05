export default function FavouriteReducer(favourite = [], action) {
  switch (action.type) {
    case "SETFAVOURITE":
      return action.payload;
    case "ADDFAVOURITE":
      favourite = favourite.concat([action.payload]);
      return favourite;
    case "REMOVEFAVOURITE":
      favourite = favourite.filter((el) => el !== action.payload);
      return favourite;
    default:
      return favourite;
  }
}
