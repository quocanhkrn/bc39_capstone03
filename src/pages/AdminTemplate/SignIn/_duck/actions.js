import api from "utils/apiUtil";
import * as TYPES from "./types";

export const SignInRequest = (navigate, user) => {
  return (dispatch) => {
    dispatch(actSignInRequest());
    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        const user = result.data.content;
        if (user.maLoaiNguoiDung === "KhachHang") {
          return Promise.reject({
            response: {
              data: {
                content: "YOU DONT'T HAVE ACCESS PERMISSION",
              },
            },
          });
        } else {
          localStorage.setItem("admin-account", JSON.stringify(user));
          navigate("/admin/movies", { replace: true });
        }
      })
      .catch((error) => dispatch(actSignInFail(error.response.data.content)));
  };
};

export const actSignInRequest = () => {
  return { type: TYPES.SIGN_IN_REQUEST };
};

export const actSignInSuccess = (data) => {
  return { type: TYPES.SIGN_IN_SUCCESS, payload: data };
};

export const actSignInFail = (error) => {
  return { type: TYPES.SIGN_IN_FAIL, payload: error };
};
