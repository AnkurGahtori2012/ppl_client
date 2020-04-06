import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
export default combineReducers({ categoryReducer, userReducer, postReducer });
