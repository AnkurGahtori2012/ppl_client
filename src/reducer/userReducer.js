const initialState = { userInfo: "Abhi kuch nhi set hua h yha pe" };
const userReducer = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    return { ...state, userInfo: action.userInfo };
  }
  return { ...state };
};
export default userReducer;
