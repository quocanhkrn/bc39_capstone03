import api from "utils/apiUtil";
import * as TYPES from "./types";

export const homeMovieListFetchData = () => {
  return (dispatch) => {
    dispatch(actHomeMovieListRequest());
    api
      .get("QuanLyPhim/LayDanhSachPhim?maNhom=GP03")
      .then((result) => {
        dispatch(actHomeMovieListSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actHomeMovieListFail(error));
      });
  };
};

export const actHomeMovieListRequest = () => {
  return {
    type: TYPES.MOVIE_LIST_REQUEST,
  };
};

export const actHomeMovieListSuccess = (data) => {
  return {
    type: TYPES.MOVIE_LIST_SUCCESS,
    payload: data,
  };
};

export const actHomeMovieListFail = (error) => {
  return {
    type: TYPES.MOVIE_LIST_FAIL,
    payload: error,
  };
};
