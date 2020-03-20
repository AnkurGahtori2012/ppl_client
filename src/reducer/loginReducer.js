const initialState = {
  loggedIn: false
};
const loginReducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === "LOGIN") {
      console.log("setting state :",{ ...state, loggedIn: true });
    return { ...state, loggedIn: true };
  } else if (action.type === "LOGOUT") {
    console.log("setting state :",{ ...state, loggedIn: false });
    return { ...state, loggedIn: false };
  }
  return newState;
};
export default loginReducer;