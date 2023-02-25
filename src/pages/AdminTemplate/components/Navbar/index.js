import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("admin-account");
    navigate("/admin/signin");
  };

  const renderSignInBtn = () => {
    if (localStorage.getItem("admin-account")) {
      const user = JSON.parse(localStorage.getItem("admin-account"));

      return (
        <div className="dropdown">
          <button className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            {user.hoTen}
          </button>
          <div className="dropdown-menu dropdown-menu-lg-right">
            <button className="dropdown-item" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg mb-3 navbar-dark bg-primary">
        <h1 className="navbar-brand m-0">CYBERCINEMA</h1>
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
            <li className="nav-item">
              <NavLink className="nav-link" to={"movies"}>
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"users"}>
                Users
              </NavLink>
            </li>
          </ul>
          {renderSignInBtn()}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
