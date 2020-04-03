import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducer/rootReducer";
import ReduxThunk from "redux-thunk";
import thunk from "redux-thunk";
const ComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const store = createStore(
  rootReducer,
  ComposeEnhancers(applyMiddleware(ReduxThunk))
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
