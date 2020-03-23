const initialState = {
  categoriesToDisplay: "ALL",
  categories: []
};
const categoryReducer = (state = initialState, action) => {
  if (action.type === "CATEGORY_CHANGE") {
    return { ...state, categoriesToDisplay: action.categoriesToDisplay };
  } else if (action.type === "GET_CATEGORY") {
    // console.log(action.categories,  "after uploading categories in reducer", {
    //   ...state,
    //   categories: action.categories
    // });
    return { ...state, categories: action.categories };
  }
  return { ...state };
};

export default categoryReducer;
