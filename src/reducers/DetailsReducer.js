export default function DetailsReducer(details = null, action) {
  switch (action.type) {
    case "SETRECIPEDETAILS":
      return action.payload;
    case "UPDATERECIPEDETAILS":
      var data = action.payload.data;
      details[action.payload.fieldToUpdate] = data;
      details.time = +details.time;
      return { ...details };
    default:
      return details;
  }
}
