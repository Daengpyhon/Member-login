import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
// import functions with ath file
import { login } from "../../functions/auth";
// import useDispatch from redux
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  // latest
  const [loading, setLoading] = useState(false);
  // Step 3
  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    //console.log(value);
    login(value)
      .then((res) => {
        toast.success(
          res.data.payload.user.username + " : ເຂົ້າສູ່ລະບົບສຳເລັດ",  {
            theme: "colored",
          }
        );
        //console.log(res.data);
        // store token, username and role in the state
        // Note: when you refresh on frontend these state is clear
        // Step 2

        setTimeout(() => {
          dispatch({
            type: "LOGIN",
            payload: {
              token: res.data.token,
              username: res.data.payload.user.username,
              role: res.data.payload.user.role,
            },
          });

          // Save token in the localstorage
          localStorage.setItem("token", res.data.token);
          // Check role and redirect
          /// Step 3
          roleBaseRedirect(res.data.payload.user.role);
        }, 1000);
      })

      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data, {
          theme: "colored",
        });
      });
  };
  return (
    <div className="container">
      {loading ? (
        <>
         <h4 className="text-center"><span className="spinner-border text-primary " role="status"></span>&nbsp;&nbsp;ກຳລັງໂຫຼດ...</h4>
       
        </>
      ) : (
        <h4 className="text-center">ລ໋ອກອີນເຂົ້າສູ່ລະບົບ</h4>
      )}

      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-input my-2">
              <label htmlFor="fname" className="fw-bold fs-6">
                ຊື່ຜູ້ໃຊ້ :{" "}
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="ໃສຊື່ຜູ້ໃຊ້..."
                onChange={handleChange}
              />
            </div>
            <div className="form-input my-2">
              <label htmlFor="password" className="fw-bold fs-6">
                ລະຫັດຜ່ານ :{" "}
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="ໃສລະຫັດຜ່ານ..."
                onChange={handleChange}
              />
            </div>

            <div className="form-input my-2">
              <button className="btn btn-success px-3 fs-6">ລ໋ອກອີນ</button>
              <p className="fs-6 fw-bold mt-3">
                ຖ້າເຈົ້າຍັງບໍມີບັນຊີ :{" "}
                <Link to="/register">ສະໝັກສະມາຊິກທີ່ນີ້</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
