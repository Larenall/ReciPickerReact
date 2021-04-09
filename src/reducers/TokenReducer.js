export default function TokenReducer(token = null, action) {
  switch (action.type) {
    case "SETTOKEN":
      return action.payload;
    default:
      return token;
  }
}
