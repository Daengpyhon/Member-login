import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>({...state}));
 // console.log("user navbar : ", user)
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <h3 className="fw-bold">I-DEV</h3>
        </Link>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary fs-6 fw-bold">
              ໜ້າຫຼັກ
            </Link>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          {!user && 
          <>
          <Link to="/login">
            <button type="button" className="btn btn-outline-primary me-2">
              ລ໋ອກອີນ
            </button>
          </Link>
          </>}         
          {user && 
          <>
          <button type="button" className="btn btn-warning" onClick={logout}>
            ອອກຈາກລະບົບ
          </button>
          </>}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
