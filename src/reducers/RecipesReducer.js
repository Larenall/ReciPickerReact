export default function RecipesReducer(recipes = [], action) {
  switch (action.type) {
    case "SETRECIPES":
      return action.payload;
    default:
      return recipes;
  }
}
