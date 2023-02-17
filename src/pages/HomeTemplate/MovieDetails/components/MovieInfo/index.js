import Loader from "components/Loader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { movieInfoFetchData } from "./_duck/actions";

function MovieInfo(props) {
  const dispatch = useDispatch();
  const { loading, data: movie } = useSelector((state) => state.HomeMovieInfoReducer);

  useEffect(() => {
    dispatch(movieInfoFetchData(props.id));
  }, []);

  const renderPremiereStatus = () => {
    return (
      <div className="d-flex align-items-center mb-2">
        {movie.dangChieu === true && (
          <img className="now-showing-gif mr-1" src="https://upload.wikimedia.org/wikipedia/commons/4/41/Red_circle.gif" alt="" />
        )}
        <h6 className="d-inline m-0">{movie.dangChieu === true ? "NOW SHOWING" : "COMING SOON"}</h6>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="movie-info">
        <Loader />
      </section>
    );
  } else {
    document.title = `${movie.tenPhim.toUpperCase()} | CYBERCINEMA`;

    return (
      <section className="movie-info row">
        <div className="movie-info__poster col-12 col-md-3 text-center">
          <img className="img-fluid rounded-3" src={movie.hinhAnh} />
        </div>
        <div className="movie-info__description col mt-3 m-md-0 pl-md-5">
          {renderPremiereStatus()}
          <h1 className="title text-uppercase">{movie.tenPhim}</h1>
          <p className="text-white-50">Premiered: {movie.ngayKhoiChieu.substring(0, movie.ngayKhoiChieu.indexOf("T"))}</p>
          <p className="overview mt-3">{movie.moTa}</p>
          <a className="btn trailer-btn w-100" href={movie.trailer} target="_blank">
            <i className="fa-solid fa-play mr-2" />
            PLAY TRAILER
          </a>
        </div>
      </section>
    );
  }
}

export default MovieInfo;
