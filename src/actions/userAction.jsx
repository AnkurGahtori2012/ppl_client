export const setUserInfo = payload => {
  return {
    type: "SET_USER",
    userInfo: payload
  };
};
export const login = () => {
  return {
    type: "LOGIN"
  };
};
export const logout = () => {
  return {
    type: "LOGOUT"
  };
};
