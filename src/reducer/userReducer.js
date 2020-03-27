const initialState = { userInfo: "Abhi kuch nhi set hua h yha pe" };
const userReducer = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    console.log("setting user with given data");
    return { ...state, userInfo: action.userInfo };
  }
  return { ...state };
};
export default userReducer;
