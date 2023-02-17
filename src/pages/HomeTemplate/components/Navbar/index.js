import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("guest-account");
    navigate(0);
  };

  const renderLogInBtn = () => {
    if (localStorage.getItem("guest-account")) {
      const user = JSON.parse(localStorage.getItem("guest-account"));
      const userFullName = user.hoTen.split(" ").join("+");
      return (
        <div className="dropdown">
          <button className="btn dropdown-toggle d-flex align-items-center" type="button" data-toggle="dropdown" aria-expanded="false">
            <div className="avatar d-inline-block mr-2 rounded-circle">
              <img src={`https://ui-avatars.com/api/?name=${userFullName}&background=random`} />
            </div>
            <span>{user.hoTen}</span>
          </button>
          <div className="dropdown-menu dropdown-menu-lg-right">
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-gear mr-2" />
              Settings
            </a>
            <div className="dropdown-divider"></div>
            <a role={"button"} className="dropdown-item" onClick={handleSignOut}>
              <i className="fa-solid fa-right-from-bracket mr-2" />
              Sign out
            </a>
          </div>
        </div>
      );
    } else
      return (
        <a className="btn btn-danger" href="/signin">
          ĐĂNG NHẬP
        </a>
      );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <a className="navbar-brand" href="/">
          <span>CYBER</span>CINEMA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#showtimes">
                Showtimes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#movie-list">
                Movies
              </a>
            </li>
          </ul>
          {renderLogInBtn()}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
