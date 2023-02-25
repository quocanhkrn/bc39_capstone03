import api from "utils/apiUtil";
import * as TYPES from "./types";

export const reservationSendRequest = (navigate, thongTinVe) => {
  return (dispatch) => {
    dispatch(actReservationRequest());
    api
      .post("QuanLyDatVe/DatVe", thongTinVe)
      .then((result) => {
        dispatch(actReservationSuccess(result.data.content));
        navigate("/reservationCompleted");
      })
      .catch((error) => dispatch(actReservationFail(error)));
  };
};

export const actReservationRequest = () => {
  return { type: TYPES.RESERVATION_REQUEST };
};

export const actReservationSuccess = (data) => {
  return {
    type: TYPES.RESERVATION_SUCCESS,
    payload: data,
  };
};

export const actReservationFail = (error) => {
  return {
    type: TYPES.RESERVATION_FAIL,
    payload: error,
  };
};
