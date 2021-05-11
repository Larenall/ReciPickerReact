import { customToggleClass } from "../components/SignIn/SignIn";

export const clearAlerts = () => {
  return {
    type: "CLEARALERTS",
  };
};
export const addAlert = (subj, msg, clr) => {
  return {
    type: "ADDALERT",
    payload: { subj, msg, clr },
  };
};
export const closeAlert = (idx) => {
  return {
    type: "CLOSEALERT",
    payload: idx,
  };
};
export const setRecipeDetails = (recipe) => {
  return {
    type: "SETRECIPEDETAILS",
    payload: recipe,
  };
};
export const updateRecipeDetails = (fieldToUpdate, data) => {
  return {
    type: "UPDATERECIPEDETAILS",
    payload: { fieldToUpdate, data },
  };
};
export const addFavourite = (recipeId) => {
  return {
    type: "ADDFAVOURITE",
    payload: recipeId,
  };
};
export const addFavouriteToServer = (recipeId) => async (
  dispatch,
  getState
) => {
  await fetch("https://localhost:5001/api/UserFavouriteRecipes", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getState().token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId, userId: getState().currentUser.userId }),
  });
  dispatch(addFavourite(recipeId));
};

export const removeFavourite = (recipeId) => {
  return {
    type: "REMOVEFAVOURITE",
    payload: recipeId,
  };
};

export const removeFavouriteFromServer = (recipeId) => async (
  dispatch,
  getState
) => {
  await fetch("https://localhost:5001/api/UserFavouriteRecipes", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getState().token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId, userId: getState().currentUser.userId }),
  });
  dispatch(removeFavourite(recipeId));
};

export const setFavourite = (userFavourite) => {
  return {
    type: "SETFAVOURITE",
    payload: userFavourite,
  };
};

export const userSignedIn = (id, login, role) => {
  return {
    type: "USERSIGNEDIN",
    payload: { id, login, role },
  };
};
export const userLogOut = () => {
  return {
    type: "USERLOGOUT",
  };
};
export const registerUser = (dataToSend, history) => async (
  dispatch,
  getState
) => {
  const data = await fetch("https://localhost:5001/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  }).then((response) => response.json());
  const login = document.querySelector("#registerLogin");
  const email = document.querySelector("#registerEmail");

  if (!data.loginTaken) {
    if (!data.emailTaken) {
      dispatch(addAlert("Register", "successful", "green"));
      dispatch(userSignedIn(data.userID, data.login, data.role));
      dispatch(setFavourite(data.userFavourite));
      dispatch(authorize(data.userID, data.login, data.role, history));
      customToggleClass(email, "is-valid");
      customToggleClass(login, "is-valid");
    } else {
      dispatch(addAlert("E-mail", "is taken"));
      customToggleClass(email, "is-invalid");
    }
  } else {
    dispatch(addAlert("Login", "is taken"));
    customToggleClass(login, "is-invalid");
    if (data.emailTaken) {
      dispatch(addAlert("E-mail", "is taken"));
      customToggleClass(email, "is-invalid");
    }
  }
};

export const signInUser = (dataToSend, history) => async (
  dispatch,
  getState
) => {
  const data = await fetch("https://localhost:5001/api/Users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  }).then((response) => response.json());
  const login = document.querySelector("#userLogin");
  const password = document.querySelector("#userPass");

  if (data.userExists) {
    if (data.isPasswordCorrect) {
      dispatch(userSignedIn(data.userID, data.login, data.role));
      dispatch(setFavourite(data.userFavourite));
      dispatch(authorize(data.userID, data.login, data.role, history));
      customToggleClass(login, "is-valid");
      customToggleClass(password, "is-valid");
    } else {
      dispatch(addAlert("Password", "is incorrect"));
      customToggleClass(password, "is-invalid");
    }
  } else {
    dispatch(addAlert("User", "doesn`t exists"));
    customToggleClass(login, "is-invalid");
  }
};
export const changeUserPassword = (dataToSend, history) => async (
  dispatch,
  getState
) => {
  const isPasswordChanged = await fetch(
    "https://localhost:5001/api/Users/role",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    }
  ).then((response) => response.json());
  const login = document.querySelector("div#changePassForm #UserLogin");
  const email = document.querySelector("div#changePassForm #UserEmail");

  if (isPasswordChanged) {
    document.querySelector(".screen").classList.remove("open");
    dispatch(addAlert("Password", "changed", "green"));
    customToggleClass(login, "is-valid");
    customToggleClass(email, "is-valid");
  } else {
    dispatch(addAlert("User", "doesn`t exists"));
    customToggleClass(login, "is-invalid");
    customToggleClass(email, "is-invalid");
  }
};
export const authorize = (id, login, role, history) => async (
  dispatch,
  getState
) => {
  const data = {
    UserID: id,
    Login: login,
    Role: role,
  };
  const token = await fetch("https://localhost:5001/api/Users/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.text());
  dispatch(setToken(token));
  history.push("/recipes");
  dispatch(clearAlerts());
};
export const setToken = (token) => {
  return {
    type: "SETTOKEN",
    payload: token,
  };
};

export const setFilters = (filters) => {
  return {
    type: "SETFILTERS",
    payload: filters,
  };
};

export const getFilters = () => async (dispatch, getState) => {
  const data = await fetch("https://localhost:5001/api/Filters", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getState().token,
    },
  }).then((response) => {
    if (response.status === 401) {
      window.location.href = "//localhost:3000/";
    }
    return response.json();
  });
  dispatch(setFilters(data));
};

export const setRecipes = (recipes) => {
  return {
    type: "SETRECIPES",
    payload: recipes,
  };
};

export const getRecipes = (
  pos = [],
  neg = [],
  time = [],
  approvedOnly = true
) => async (dispatch, getState) => {
  var data = await fetch("https://localhost:5001/api/Recipes", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getState().token,
    },
  }).then((response) => {
    if (response.status === 401) {
      window.location.href = "//localhost:3000/";
    }
    return response.json();
  });

  data = data
    .filter((value) =>
      pos.length !== 0
        ? pos.filter((x) => value.filters.includes(x)).length === pos.length
        : true
    )
    .filter((value) =>
      neg.length !== 0 ? !value.filters.some((el) => neg.includes(el)) : true
    )
    .filter((value) =>
      time.length !== 0 ? value.time >= time[0] && value.time <= time[1] : true
    );
  if (approvedOnly) {
    data = data.filter((f) => f.isApproved);
  }
  dispatch(setRecipes(data));
};

export const filterChecked = (type, id, state) => {
  return {
    type: "FILTERCHECKED",
    payload: { type: type, id: id, state: state },
  };
};
export const applyFilters = () => {
  return {
    type: "APPLYFILTERS",
  };
};
export const clearFilters = () => {
  return {
    type: "CLEARFILTERS",
  };
};
export const setUsers = (data) => {
  return {
    type: "SETUSERS",
    payload: data,
  };
};

export const getUsers = () => async (dispatch, getState) => {
  var data = await fetch("https://localhost:5001/api/Users", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getState().token,
    },
  }).then((response) => response.json());

  dispatch(setUsers(data));
};

export const updateUserRole = (userId, role) => async (dispatch, getState) => {
  await fetch("https://localhost:5001/api/Users/role", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getState().token,
    },
    body: JSON.stringify({ UserId: userId, Role: role }),
  });
  dispatch(getUsers());
};

export const updateRecipe = (fieldToUpdate, data) => async (
  dispatch,
  getState
) => {
  dispatch(updateRecipeDetails(fieldToUpdate, data));
  await fetch("https://localhost:5001/api/Recipes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getState().token,
    },
    body: JSON.stringify(getState().recipeDetails),
  });
  dispatch(getRecipes([], [], [], false));
};
