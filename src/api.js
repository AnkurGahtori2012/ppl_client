import Axios from "axios";
export const getCategories = async () => {
  return 40;
  let data;
  await Axios.get("http://192.168.43.83:8082/category/getCategories").then(
    result => {
      if (result.data) {
        data = {
          categories: result.data
        };
      }
    }
  );
  return data;
};
export const addCategories = async formData => {
  await Axios.post(
    "http://192.168.43.83:8082/category/addCategory",
    formData
  ).then(result => {
    if (result.data) {
      console.log("returning null");
      return null;
    } else {
      console.log("user already exist");
      return "Category Already Exist";
    }
  });
};
