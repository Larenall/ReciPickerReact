import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers";
import SignIn from "./components/SignIn/SignIn";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Main from "./components/Main";
import UsersRecipes from "./components/UsersRecipes";
import { createBrowserHistory } from "history";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FavouriteRecipes from "./components/FavouriteRecipes";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(
  persistedReducer,
  applyMiddleware(logger, thunk)
);
export const persistor = persistStore(store);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store} style={({ height: "100%" }, { width: "100%" })}>
    <PersistGate loading={null} persistor={persistor}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/recipes" component={Main} />
          <Route path="/recipes/mine" component={UsersRecipes} />
          <Route path="/recipes/favourite" component={FavouriteRecipes} />
          <Route path="/">
            <p>Page doesnt exists</p>
          </Route>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
