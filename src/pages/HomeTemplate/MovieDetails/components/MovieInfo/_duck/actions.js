import api from "utils/apiUtil";
import * as TYPES from "./types";

export const movieInfoFetchData = (movieId) => {
  return (dispatch) => {
    dispatch(actMovieInfoRequest());
    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
      .then((result) => {
        dispatch(actMovieInfoSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actMovieInfoFail(error));
      });
  };
};

export const actMovieInfoRequest = () => {
  return { type: TYPES.MOVIE_INFO_REQUEST };
};

export const actMovieInfoSuccess = (data) => {
  return {
    type: TYPES.MOVIE_INFO_SUCCESS,
    payload: data,
  };
};

export const actMovieInfoFail = (error) => {
  return {
    type: TYPES.MOVIE_INFO_SUCCESS,
    payload: error,
  };
};
