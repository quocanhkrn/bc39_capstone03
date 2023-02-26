import React, { useRef } from "react";
import { useParams } from "react-router-dom";

const UserForm = () => {
  const username = useParams().username;
  const submitBtn = useRef();

  if (username) {
    document.title = "UPDATE USER | CYBERCINEMA";
    submitBtn.current = (
      <button className="btn btn-warning w-100" type="submit">
        <i className="fa-solid fa-pen-to-square mr-2" />
        UPDATE
      </button>
    );
  } else {
    document.title = "NEW USER | CYBERCINEMA";
    submitBtn.current = (
      <button className="btn btn-warning w-100" type="submit">
        <i className="fa-solid fa-plus mr-2" />
        ADD
      </button>
    );
  }
  return (
    <section className="container mt-5 pt-3">
      <form>
        <h2>{username ? "UPDATE" : "NEW"}</h2>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Username</label>
          <div className="col">
            <input type="text" className="form-control" required />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">E-mail</label>
          <div className="col">
            <input type="email" className="form-control" required />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Password</label>
          <div className="col">
            <input type="password" className="form-control" required />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Phone number</label>
          <div className="col">
            <input type="tel" className="form-control" required />
          </div>
        </div>
        <div className="row no-gutters mb-3">
          <div className="col-2 d-none d-md-block mr-2"></div>
          <div className="col d-flex">
            <div className="form-check mr-5">
              <input className="form-check-input" type="radio" name="maLoaiNguoiDung" value="KhachHang" checked />
              <label className="form-check-label">Khách hàng</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="maLoaiNguoiDung" value="QuanTri" />
              <label className="form-check-label">Quản trị</label>
            </div>
          </div>
        </div>
        {submitBtn.current}
      </form>
    </section>
  );
};

export default UserForm;
