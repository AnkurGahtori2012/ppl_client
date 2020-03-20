import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import categoryReducer from "./categoryReducer";
export default combineReducers({ loginReducer, categoryReducer });
