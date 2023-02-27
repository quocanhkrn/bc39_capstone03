import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersRequest } from "./_duck/actions";
import styled from "styled-components";
import api from "utils/apiUtil";

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
`;

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.AdminUserListReducer);

  document.title = "USER MANAGEMENT | CYBERCINEMA";

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  const handleDeleteUser = (username) => {
    if (window.confirm("Are you sure?")) {
      api
        .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`)
        .then((result) => {
          alert(result.data.content);
          dispatch(getUsersRequest());
        })
        .catch((error) => alert(error.response.data.content));
    }
  };

  if (loading || !data) {
    return (
      <section className="container d-flex justify-content-center mt-5 pt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </section>
    );
  } else {
    return (
      <section className="container mt-5 pt-3">
        <input type="text" className="form-control mb-1" placeholder="Search..." />
        <button className="btn btn-primary w-100 mb-1" onClick={() => navigate("new")}>
          + ADD USER
        </button>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Fullname</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Group</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => {
                return (
                  <tr key={user.taiKhoan} className="align-middle" scope="row">
                    <td>{user.taiKhoan}</td>
                    <td>{user.hoTen}</td>
                    <td>{user.email}</td>
                    <td>{user.soDT}</td>
                    <td>{user.maLoaiNguoiDung}</td>
                    <td>
                      <Button className="text-primary" onClick={() => navigate(`edit/${user.taiKhoan}`)}>
                        <i className="fa-solid fa-pen-to-square" />
                      </Button>
                      <Button className="text-warning mx-2">
                        <i className="fa-solid fa-calendar-days" />
                      </Button>
                      <Button className="text-danger" onClick={() => handleDeleteUser(user.taiKhoan)}>
                        <i className="fa-solid fa-trash" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
};

export default Users;
