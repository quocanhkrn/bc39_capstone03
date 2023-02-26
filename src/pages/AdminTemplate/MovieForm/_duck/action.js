import api from "utils/apiUtil";
import * as TYPES from "./types";

export const getMovieInfoRequest = (movieId) => {
  return (dispatch) => {
    dispatch(actGetMovieInfoRequest());
    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
      .then((result) => {
        dispatch(actGetMovieInfoSuccess(result.data.content));
      })
      .catch((error) => dispatch(actGetMovieInfoFail(error)));
  };
};

export const actGetMovieInfoRequest = () => {
  return { type: TYPES.GET_MOVIE_INFO_REQUEST };
};

export const actGetMovieInfoSuccess = (data) => {
  return {
    type: TYPES.GET_MOVIE_INFO_SUCCESS,
    payload: data,
  };
};

export const actGetMovieInfoFail = (error) => {
  return {
    type: TYPES.GET_MOVIE_INFO_FAIL,
    payload: error,
  };
};
