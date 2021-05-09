export default function UsersReducer(users = null, action) {
  switch (action.type) {
    case "SETUSERS":
      return action.payload;
    default:
      return users;
  }
}
