import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

function AdminTemplate() {
  if (!localStorage.getItem("admin-account")) {
    return <Navigate to={"signin"} replace={true} />;
  } else {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  }
}

export default AdminTemplate;
