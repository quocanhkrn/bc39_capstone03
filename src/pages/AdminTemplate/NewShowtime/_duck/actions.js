import api from "utils/apiUtil";
import * as TYPES from "./types";

export const addShowtimeRequest = (showtime, navigate) => {
  return (dispatch) => {
    dispatch(actAddShowtimeRequest());
    api.post("QuanLyDatVe/TaoLichChieu", showtime).then((result) => {
      dispatch(actAddShowtimeSuccess(result.data.content));
      if (window.confirm("Successfully created a new showtime!")) {
        navigate(-1, { replace: true });
      }
    });
  };
};

const actAddShowtimeRequest = () => {
  return { type: TYPES.ADD_SHOWTIME_REQUEST };
};

const actAddShowtimeSuccess = (data) => {
  return {
    type: TYPES.ADD_SHOWTIME_SUCCESS,
    payload: data,
  };
};

const actAddShowtimeFail = (error) => {
  return {
    type: TYPES.ADD_SHOWTIME_FAIL,
    payload: error,
  };
};
