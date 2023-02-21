import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import MovieInfo from "./components/MovieInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticketBookingFetchData } from "./_duck/actions";
import Loader from "components/Loader";
import Seats from "./components/Seats";

function Reservation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const maLichChieu = useParams().id;
  const { loading, data, error } = useSelector((state) => state.TicketBookingReducer);

  useEffect(() => {
    if (!localStorage.getItem("guest-account")) {
      navigate("/signin");
    }

    dispatch(ticketBookingFetchData(maLichChieu));
  }, []);

  if (loading) {
    document.title = `Loading... | CYBERCINEMA`;

    return (
      <section className="ticket-booking">
        <Loader />
      </section>
    );
  } else {
    document.title = `ĐẶT VÉ | ${data.thongTinPhim.tenPhim.toUpperCase()} | CYBERCINEMA`;

    return (
      <section className="ticket-booking container">
        <MovieInfo movieInfo={data.thongTinPhim} />
        <Seats maLichChieu={maLichChieu} seatingPlan={data.danhSachGhe} />
      </section>
    );
  }
}

export default Reservation;
