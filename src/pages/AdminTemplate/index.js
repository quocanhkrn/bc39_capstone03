import React from "react";
import { Outlet } from "react-router-dom";

function AdminTemplate() {
  return (
    <>
      <div>Admin</div>
      <Outlet />
    </>
  );
}

export default AdminTemplate;
