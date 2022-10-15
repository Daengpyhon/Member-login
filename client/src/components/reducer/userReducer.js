export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      // return : "Hello login 55555"
      return action.payload;
    case "LOGOUT":
      // return : "Hello logout 55555"
      localStorage.clear()
      return action.payload;
    default:
      return state;
  }
};
