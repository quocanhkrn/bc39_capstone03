import api from "utils/apiUtil";
import * as TYPES from "./types";

export const addUserRequest = (user, navigate) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    api
      .post("QuanLyNguoiDung/ThemNguoiDung", user)
      .then((result) => {
        dispatch(actAddUserSuccess(result.data.content));
        if (window.confirm("Successfully!")) {
          navigate(-1, { replace: true });
        }
      })
      .catch((error) => dispatch(actAddUserFail(error.response.data.content)));
  };
};

const actAddUserRequest = () => {
  return { type: TYPES.ADD_USER_REQUEST };
};

export const actAddUserSuccess = (data) => {
  return {
    type: TYPES.ADD_USER_SUCCESS,
    payload: data,
  };
};

const actAddUserFail = (error) => {
  return {
    type: TYPES.ADD_USER_FAIL,
    payload: error,
  };
};

export const updateUserRequest = (user, navigate) => {
  return (dispatch) => {
    dispatch(actUpdateUserRequest());
    api
      .post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
      .then((result) => {
        dispatch(actUpdateUserSuccess(result.data.content));
        if (window.confirm("Successfully!")) {
          if (JSON.parse(localStorage.getItem("admin-account")).taiKhoan === user.taiKhoan) {
            localStorage.removeItem("admin-account");

            api
              .post("QuanLyNguoiDung/DangNhap", { taiKhoan: user.taiKhoan, matKhau: user.matKhau })
              .then((result) => {
                const user = result.data.content;
                if (user.maLoaiNguoiDung === "KhachHang") {
                  navigate(0);
                } else {
                  localStorage.setItem("admin-account", JSON.stringify(user));
                  navigate(-1, { replace: true });
                }
                if (user.maLoaiNguoiDung !== "QuanTri") {
                  navigate(0);
                }
              })
              .catch((error) => dispatch(actUpdateUserFail(error.response.data.content)));
          } else {
            navigate(-1, { replace: true });
          }
        }
      })
      .catch((error) => dispatch(actUpdateUserFail(error.response.data.content)));
  };
};

const actUpdateUserRequest = () => {
  return { type: TYPES.UPDATE_USER_REQUEST };
};

export const actUpdateUserSuccess = (data) => {
  return {
    type: TYPES.UPDATE_USER_SUCCESS,
    payload: data,
  };
};

const actUpdateUserFail = (error) => {
  return {
    type: TYPES.UPDATE_USER_FAIL,
    payload: error,
  };
};
