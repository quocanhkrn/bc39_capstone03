import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUserRequest, updateUserRequest } from "./_duck/actions";
import { useEffect } from "react";
import api from "utils/apiUtil";

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useParams().username;
  const submitBtn = useRef();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    soDT: "",
    maNhom: "GP03",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  useEffect(() => {
    if (username) {
      api
        .post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${username}`)
        .then((result) => setUser(result.data.content))
        .catch((error) => console.log(error));
    }
  }, [username]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      dispatch(updateUserRequest(user, navigate));
    } else {
      dispatch(addUserRequest(user, navigate));
    }
  };

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
      <form onSubmit={handleSubmit}>
        <h2>{username ? "UPDATE" : "NEW"}</h2>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Username</label>
          <div className="col">
            <input type="text" className="form-control" required name="taiKhoan" value={user.taiKhoan} onChange={handleOnChange} />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Fullname</label>
          <div className="col">
            <input type="text" className="form-control" required name="hoTen" value={user.hoTen} onChange={handleOnChange} />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">E-mail</label>
          <div className="col">
            <input type="email" className="form-control" required name="email" value={user.email} onChange={handleOnChange} />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Password</label>
          <div className="col">
            <input type="password" className="form-control" required name="matKhau" value={user.matKhau} onChange={handleOnChange} />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Phone number</label>
          <div className="col">
            <input type="text" className="form-control" required name="soDt" value={user.soDt || user.soDT} onChange={handleOnChange} />
          </div>
        </div>
        <div className="row no-gutters mb-3">
          <div className="col-2 d-none d-md-block mr-2"></div>
          <div className="col d-flex">
            <div className="form-check mr-5">
              <input
                className="form-check-input"
                type="radio"
                name="maLoaiNguoiDung"
                value="KhachHang"
                checked={user.maLoaiNguoiDung === "KhachHang"}
                onChange={handleOnChange}
              />
              <label className="form-check-label">Khách hàng</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="maLoaiNguoiDung"
                value="QuanTri"
                checked={user.maLoaiNguoiDung !== "KhachHang"}
                onChange={handleOnChange}
              />
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
