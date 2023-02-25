import api from "utils/apiUtil";
import * as TYPES from "./types";

export const ticketBookingFetchData = (maLichChieu) => {
  return (dispatch) => {
    dispatch(actTicketBookingRequest());
    api
      .get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      .then((result) => {
        dispatch(actTicketBookingSuccess(result.data.content));
      })
      .catch((error) => dispatch(actTicketBookingFail(error)));
  };
};

export const actTicketBookingRequest = () => {
  return {
    type: TYPES.TICKET_BOOKING_REQUEST,
  };
};

export const actTicketBookingSuccess = (data) => {
  return {
    type: TYPES.TICKET_BOOKING_SUCCESS,
    payload: data,
  };
};

export const actTicketBookingFail = (error) => {
  return {
    type: TYPES.TICKET_BOOKING_FAIL,
    payload: error,
  };
};
