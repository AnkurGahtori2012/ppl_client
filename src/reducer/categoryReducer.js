const initialState = {
  categoriesToDisplay: { categoryName: "ALL" },
  categories: []
};
const categoryReducer = (state = initialState, action) => {
  if (action.type === "CATEGORY_CHANGE") {
    return {
      ...state,
      categoriesToDisplay: action.categoriesToDisplay
    };
  } else if (action.type === "SET_CATEGORY") {
    return { ...state, categories: [...action.categories] };
  }
  return { ...state };
};

export default categoryReducer;
