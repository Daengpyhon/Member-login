import axios from 'axios'

export const listUser = async (authtoken) => {
  // console.log(authtoken)
  return axios.get(
    process.env.REACT_APP_API + "/users",
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};


export const changeStatus = async (authtoken, value) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/change-status",value,
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};


export const changeRole = async (authtoken, value) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/change-role",value,
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
//! Remove user
export const removeUser = async (authtoken, id) => {
  // console.log(authtoken)
  return axios.delete(
    process.env.REACT_APP_API + "/users/"+id,
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};

// ! Change Password
export const resetPassword = async (authtoken, id, value) => {
  // console.log(authtoken)
  return axios.put(
    process.env.REACT_APP_API + "/users/"+id,value,
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};