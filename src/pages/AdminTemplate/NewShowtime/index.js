import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "utils/apiUtil";
import { addShowtimeRequest } from "./_duck/actions";

function NewShowtime() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.AdminShowtimeReducer);
  const movieId = parseInt(useParams().id);
  const [movie, setmovie] = useState();
  const [showtime, setShowtime] = useState({ maPhim: movieId, ngayChieuGioChieu: "", maRap: "", giaVe: 0 });
  const [chains, setChains] = useState([]);
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
      .then((result) => setmovie(result.data.content))
      .catch((error) => console.log(error.respones.data.content));

    api
      .get("QuanLyRap/LayThongTinHeThongRap")
      .then((result) => setChains(result.data.content))
      .catch((error) => console.log(error.response.data.content));
  }, []);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "chains") {
      api
        .get(`QuanLyRap/LayThongTinCumRapTheoHeThong?MaHeThongRap=${value}`)
        .then((result) => setTheatres(result.data.content))
        .catch((error) => console.log(error.respones.data.content));
    } else {
      if (name === "ngayChieuGioChieu") {
        let [date, time] = value.split("T");
        let dateParts = date.split("-");
        value = `${dateParts.reverse().join("/")} ${time}:00`;
      }
      setShowtime((prevShowtime) => {
        return { ...prevShowtime, [name]: value };
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(addShowtimeRequest(showtime, navigate));
  };

  document.title = "NEW SHOWTIME | CYBERCINEMA";

  return (
    <section className="container mt-5 pt-3">
      <h1 className="m-0">CREATE NEW SCHEDULE</h1>
      <h4 className="text-black-50">{movie && movie.tenPhim}</h4>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border mb-3 text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={error ? "alert alert-danger" : ""}>{error}</div>
      <form className="mt-3" onSubmit={handleOnSubmit}>
        <select className="form-control mb-2" name="chains" onChange={handleOnChange} required>
          <option>Select chain</option>
          {chains.map((chain) => {
            const { maHeThongRap, tenHeThongRap } = chain;
            return (
              <option key={maHeThongRap} value={maHeThongRap}>
                {tenHeThongRap}
              </option>
            );
          })}
        </select>
        <select className="form-control mb-2" name="maRap" onChange={handleOnChange} required>
          <option>Select theatre</option>
          {theatres.map((theatre) => {
            const { maCumRap, tenCumRap } = theatre;
            return (
              <option key={maCumRap} value={maCumRap}>
                {tenCumRap}
              </option>
            );
          })}
        </select>
        <label>Date, time of the show</label>
        <input type="datetime-local" className="form-control mb-2" name="ngayChieuGioChieu" onChange={handleOnChange} required />
        <label>Ticket price</label>
        <input type="number" min={1000} className="form-control mb-2" name="giaVe" onChange={handleOnChange} required />
        <button type="submit" className="btn btn-warning w-100">
          + CREATE NEW SHOWTIME
        </button>
      </form>
    </section>
  );
}

export default NewShowtime;
