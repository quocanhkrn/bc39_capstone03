import React from "react";
import { Link } from "react-router-dom";

function Movie(props) {
  const movie = props.movie;

  const renderHotLable = () => {
    if (movie.hot) {
      return <p className="d-inline-block mr-1 mb-0 px-2 py-1 bg-danger rounded">HOT</p>;
    }
  };

  return (
    <Link className="movie col-6 col-md-4 col-lg-3 mb-3" to={`/details/${movie.maPhim}`}>
      <img src={movie.hinhAnh} />
      <h5 className="title mt-2 text-uppercase">
        {renderHotLable()}
        {movie.tenPhim}
      </h5>
    </Link>
  );
}

export default Movie;
