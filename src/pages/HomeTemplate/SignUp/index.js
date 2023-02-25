import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { signUpSendRequest } from "./_duck/actions";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.HomeSignUpReducer);
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP03",
    hoTen: "",
  });

  const handleOnChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpSendRequest(navigate, user));
  };

  document.title = "ĐĂNG KÝ | CYBERCINEMA";

  return (
    <div className="sign-up-form d-flex justify-content-center align-items-center">
      <form className="container" onSubmit={handleOnSubmit}>
        <h1 className="mb-4 text-center">Create new account</h1>
        <div className={error ? "alert alert-danger" : ""} role="alert">
          {error}
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Họ tên</label>
          <input type="text" className="form-control" id="fullname" name="hoTen" required onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input type="email" className="form-control" id="email" name="email" required onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">SĐT</label>
          <input type="tel" className="form-control" id="phone" name="soDt" required onChange={handleOnChange} />
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
          ĐĂNG KÝ
        </button>
        <p className="text-center">
          <a href="/signin">Đăng nhập</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
