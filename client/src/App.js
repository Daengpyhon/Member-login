import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
//Pages Admin (2)
import HomeAdmin from "./components/pages/admin/Home";
//9
import ManageAdmin from "./components/pages/admin/ManageAdmin";
//Pages User
import HomeUser from "./components/pages/user/Home";
//import currentUser from  functions folder (3)
import { currentUser } from "./components/functions/auth";
// Redux  (4)
import { useDispatch } from "react-redux";

// Route (7)
import UserRoute from "./components/routes/UserRoute";
// 8
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  const dispatch = useDispatch();
  // 5
  const idtoken = localStorage.token;
  // So let make auth file in the function components
  if (idtoken) {
    //console.log("Id token : ",idtoken)
    // Send token to backend
    // 6
    currentUser(idtoken)
      .then((res) => {
        //console.log(res.data);

        // update state on reducer
        // store idtoken, username, role on localstorage
        // Fetch these data from localstorage to state redux
        //when you refresh it's not clear state
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
           console.error(err)
      });
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 8 */}

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />

        {/* Manage Admin (9) */}
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        {/* 7 */}
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
