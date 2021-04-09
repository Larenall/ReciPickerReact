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
export const userSignedIn = (id, login, role) => {
  return {
    type: "USERSIGNEDIN",
    payload: { id, login, role },
  };
};
export const userLogOut = () => {
  return {
    type: "USERLOGOUT"
  };
};
export const sendRegData = (dataToSend, history) => async (
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

export const sendLogData = (dataToSend, history) => async (
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
    if (data.passwordCorrect) {
      dispatch(userSignedIn(data.userID, data.login, data.role));
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
  approved = false
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
  if (!approved) {
    data = data.filter((f) => f.approved);
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
