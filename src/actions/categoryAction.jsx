import { url } from "../config/url";
import Axios from "axios";
export const setCategories = () => {
  return dispatch => {
    Axios.get(url + "/category/getCategories").then(result => {
      if (result.data) {
        console.log(result.data);
        dispatch({ type: "SET_CATEGORY", categories: result.data });
      }
    });
  };
};
export const changeCategory = payload => {
  return {
    type: "CATEGORY_CHANGE",
    categoriesToDisplay: payload
  };
};
