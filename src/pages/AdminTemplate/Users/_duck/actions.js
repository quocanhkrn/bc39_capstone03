import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getUsersRequest = () => {
  return (dispatch) => {
    dispatch(actGetUsersRequest());
    api
      .get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03")
      .then((result) => dispatch(actGetUsersSuccess(result.data.content)))
      .catch((error) => dispatch(actGetUsersFail(error)));
  };
};

export const actGetUsersRequest = () => {
  return { type: TYPES.GET_USERS_REQUEST };
};

export const actGetUsersSuccess = (data) => {
  return {
    type: TYPES.GET_USERS_SUCCESS,
    payload: data,
  };
};

export const actGetUsersFail = (error) => {
  return {
    type: TYPES.GET_USERS_FAIL,
    payload: error,
  };
};
