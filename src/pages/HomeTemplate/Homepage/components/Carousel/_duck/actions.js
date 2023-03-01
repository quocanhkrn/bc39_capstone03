import api from "utils/apiUtil";
import * as TYPES from "./types";

export const HomeCarouselFetchData = () => {
  return (dispatch) => {
    dispatch(actHomeCarouselRequest());
    api
      .get("QuanLyPhim/LayDanhSachBanner")
      .then((result) => {
        dispatch(actHomeCarouselSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actHomeCarouselFail(error.response.data.content));
      });
  };
};

export const actHomeCarouselRequest = () => {
  return {
    type: TYPES.CAROUSEL_REQUEST,
  };
};

export const actHomeCarouselSuccess = (data) => {
  return {
    type: TYPES.CAROUSEL_SUCCESS,
    payload: data,
  };
};

export const actHomeCarouselFail = (error) => {
  return {
    type: TYPES.CAROUSEL_FAIL,
    payload: error,
  };
};
