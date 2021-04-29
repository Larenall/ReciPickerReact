export default function DetailsReducer(recipe = null, action) {
  switch (action.type) {
    case "SETRECIPEDETAILS":
      return action.payload;
    default:
      return recipe;
  }
}
