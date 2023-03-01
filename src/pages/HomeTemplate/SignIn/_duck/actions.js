import api from "utils/apiUtil";
import * as TYPES from "./types";

export const logInSendRequest = (user, navigate) => {
  return (dispatch) => {
    dispatch(actLogInRequest());
    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        const user = result.data.content;
        localStorage.removeItem("admin-account");
        localStorage.setItem("guest-account", JSON.stringify(user));
        navigate(-1, { replace: true });
      })
      .catch((error) => dispatch(actLogInFail(error.response.data.content)));
  };
};

export const actLogInRequest = () => {
  return { type: TYPES.LOG_IN_REQUEST };
};

export const actLogInSuccess = (data) => {
  return { type: TYPES.LOG_IN_SUCCESS, payload: data };
};

export const actLogInFail = (error) => {
  return { type: TYPES.LOG_IN_FAIL, payload: error };
};
