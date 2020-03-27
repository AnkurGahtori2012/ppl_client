import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
export default combineReducers({loginReducer, categoryReducer, userReducer });
