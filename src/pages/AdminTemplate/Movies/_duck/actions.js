import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getMoviesRequest = () => {
  return (dispatch) => {
    dispatch(actGetMoviesRequest());
    api
      .get("QuanLyPhim/LayDanhSachPhim?maNhom=GP03")
      .then((result) => {
        dispatch(actGetMoviesSuccess(result.data.content));
      })
      .catch((error) => dispatch(actGetMoviesFail(error)));
  };
};

export const actGetMoviesRequest = () => {
  return { type: TYPES.GET_MOVIES_REQUEST };
};

export const actGetMoviesSuccess = (data) => {
  return {
    type: TYPES.GET_MOVIES_SUCCESS,
    payload: data,
  };
};

export const actGetMoviesFail = (error) => {
  return {
    type: TYPES.GET_MOVIES_FAIL,
    payload: error,
  };
};
