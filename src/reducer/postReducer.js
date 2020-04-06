const initialState = {
  postsToDisplay: []
};
const postReducer = (state = initialState, action) => {
  if (action.type === "RESET_ALL_POSTS") {
    return { postsToDisplay: action.payload };
  } else if (action.type === "APPEND_POSTS") {
    return { postsToDisplay: [...state.postsToDisplay, ...action.payload] };
  } else {
    return { ...state };
  }
};
export default postReducer;
