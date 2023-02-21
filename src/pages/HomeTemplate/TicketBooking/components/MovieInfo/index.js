import React from "react";
import "./style.css";

function MovieInfo(props) {
  const { movieInfo } = props;

  return (
    <div className="movie-info row mb-4">
      <img className="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 mb-md-0" src={movieInfo.hinhAnh} />
      <div className="description col">
        <h1>{movieInfo.tenPhim.toUpperCase()}</h1>
        <h2>
          {movieInfo.tenRap} - {movieInfo.ngayChieu} - {movieInfo.gioChieu}
        </h2>
        <p className="m-0 mb-1">{movieInfo.tenCumRap}</p>
        <p className="m-0 text-white-50">{movieInfo.diaChi}</p>
      </div>
    </div>
  );
}

export default MovieInfo;
