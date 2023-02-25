import Loader from "components/Loader";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignInRequest, actSignInRequest } from "./_duck/actions";
import { useState } from "react";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.AdminSignInReducer);
  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });

  useEffect(() => {
    if (localStorage.getItem("admin-account")) {
      navigate("/admin/movies");
    }
  }, []);

  const handleOnChange = (e) => {
    dispatch(actSignInRequest());
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(SignInRequest(navigate, user));
  };

  document.title = "SIGN IN TO ADMINSPACE | CYBERCINEMA";

  return (
    <section className="container py-5">
      <h1 className="text-center">
        Welcome back to <br />
        AdminSpace!
      </h1>
      <div className={error ? "alert alert-danger" : ""} role="alert">
        {error}
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" required name="taiKhoan" onChange={handleOnChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" required name="matKhau" onChange={handleOnChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
          SIGN IN
        </button>
      </form>
    </section>
  );
};

export default SignIn;
