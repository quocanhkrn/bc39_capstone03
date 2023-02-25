import api from "utils/apiUtil";
import * as TYPES from "./types";

export const signUpSendRequest = (navigate, user) => {
  return (dispatch) => {
    dispatch(actSignUpRequest());
    api
      .post("QuanLyNguoiDung/DangKy", user)
      .then((result) => {
        localStorage.setItem("guest-account", JSON.stringify(user));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        dispatch(actSignUpFail(error));
      });
  };
};

export const actSignUpRequest = () => {
  return { type: TYPES.SIGN_UP_REQUEST };
};

export const actSignUpSuccess = (data) => {
  return { type: TYPES.SIGN_UP_SUCCESS, payload: data };
};

export const actSignUpFail = (error) => {
  return { type: TYPES.SIGN_UP_SUCCESS, payload: error };
};
