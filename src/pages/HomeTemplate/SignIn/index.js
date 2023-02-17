import Loader from "components/Loader";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import { actLogInRequest, logInSendRequest } from "./_duck/actions";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.HomeLogInReducer);
  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(logInSendRequest(user, navigate));
  };

  const handleOnChange = (e) => {
    dispatch(actLogInRequest());
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  };

  document.title = "ĐĂNG NHẬP | CYBERCINEMA";

  if (localStorage.getItem("guest-account")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <div className="sign-in-form d-flex justify-content-center align-items-center">
        <form className="w-25" onSubmit={handleOnSubmit}>
          <h1 className="mb-4 text-center">Welcome back!</h1>
          <div className={error ? "alert alert-danger" : ""} role="alert">
            {error}
          </div>
          <div className="form-group">
            <label htmlFor="username">Tài khoản</label>
            <input type="text" className="form-control" id="username" name="taiKhoan" required onChange={handleOnChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" className="form-control" id="password" name="matKhau" required onChange={handleOnChange} />
          </div>
          <button type="submit" className="btn btn-danger w-100 mb-3">
            ĐĂNG NHẬP
          </button>
          <p className="text-center">
            <a href="/signup">Đăng ký</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
