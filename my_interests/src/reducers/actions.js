export const logIn = (user) => {
  return {
    type: "LOG_IN",
    payload: user,
  };
};

export const addToken = (token) => {
  return {
    type: "ADD_TOKEN",
    payload: token,
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
