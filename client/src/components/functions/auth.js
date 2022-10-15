import axios from "axios";

export const register = async (value) => {
  return axios.post(process.env.REACT_APP_API + "/register", value);
};

export const login = async (value) => {
  return axios.post(process.env.REACT_APP_API + "/login", value);
};

// send token to backend with header token in the middleware
export const currentUser = async (authtoken) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};


// Send data login to server that Are you admin
// Start route folder in server folder
export const currentAdmin = async (authtoken) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
