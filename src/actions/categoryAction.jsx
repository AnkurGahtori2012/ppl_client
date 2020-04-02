export const setCategories = payload => {
  return {
    type: "SET_CATEGORY",
    categories: payload
  };
};
export const changeCategory = payload => {
  return {
    type: "CATEGORY_CHANGE",
    categoriesToDisplay: payload
  };
};
