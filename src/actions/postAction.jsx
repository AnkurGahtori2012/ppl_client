export const resetPostsToDisplay = payload => {
  return { type: "RESET_ALL_POSTS", payload: payload };
};
export const appendPostsToDisplay = payload => {
  return { type: "APPEND_POSTS", payload: payload };
};
