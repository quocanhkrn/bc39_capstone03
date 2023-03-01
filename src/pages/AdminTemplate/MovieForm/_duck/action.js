import api from "utils/apiUtil";
import * as TYPES from "./types";

export const addMovieRequest = (movie, navigate) => {
  return (dispatch) => {
    dispatch(actAddMovieRequest());
    api
      .post("QuanLyPhim/ThemPhimUploadHinh", movie)
      .then((result) => {
        dispatch(actAddMovieSuccess(result.data.content));
        if (window.confirm("Successfully added!")) {
          navigate(-1, { replace: true });
        }
      })
      .catch((error) => dispatch(actAddMovieFail(error.response.data.content)));
  };
};

const actAddMovieRequest = () => {
  return { type: TYPES.ADD_MOVIE_REQUEST };
};

export const actAddMovieSuccess = (data) => {
  return {
    type: TYPES.ADD_MOVIE_SUCCESS,
    payload: data,
  };
};

const actAddMovieFail = (error) => {
  return {
    type: TYPES.ADD_MOVIE_FAIL,
    payload: error,
  };
};

export const updateMovieRequest = (movie, navigate) => {
  return (dispatch) => {
    dispatch(actUpdateMovieRequest());
    api
      .post("QuanLyPhim/CapNhatPhimUpload", movie)
      .then((result) => {
        dispatch(actUpdateMovieSuccess(result.data.content));
        if (window.confirm("Successfully updated!")) {
          navigate(-1, { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actUpdateMovieFail(error.response.data.content));
      });
  };
};

const actUpdateMovieRequest = () => {
  return { type: TYPES.UPDATE_MOVIE_REQUEST };
};

export const actUpdateMovieSuccess = (data) => {
  return {
    type: TYPES.UPDATE_MOVIE_SUCCESS,
    payload: data,
  };
};

const actUpdateMovieFail = (error) => {
  return {
    type: TYPES.UPDATE_MOVIE_FAIL,
    payload: error,
  };
};
