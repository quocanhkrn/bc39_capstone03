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
      .catch((error) => dispatch(actAddUserFail(error.response.content)));
  };
};

const actAddUserRequest = () => {
  return { type: TYPES.ADD_USER_REQUEST };
};

const actAddUserSuccess = (data) => {
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
      .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
      .then((result) => {
        dispatch(actUpdateUserSuccess(result.data.content));
        if (window.confirm("Successfully!")) {
          navigate(-1, { replace: true });
        }
      })
      .catch((error) => console.log(error.response));
  };
};

const actUpdateUserRequest = () => {
  return { type: TYPES.UPDATE_USER_REQUEST };
};

const actUpdateUserSuccess = (data) => {
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
