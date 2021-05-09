export default function CurrentUserReducer(user = null, action) {
  switch (action.type) {
    case "USERSIGNEDIN":
      return action.payload;
    case "USERLOGOUT":
      return null;
    default:
      return user;
  }
}
