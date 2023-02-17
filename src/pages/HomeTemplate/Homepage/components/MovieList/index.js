import Loader from "components/Loader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeMovieListFetchData } from "./_duck/actions";
import "./style.css";
import Movie from "./components/Movie";

function MovieList() {
  const dispatch = useDispatch();
  const { loading, data: movieList } = useSelector((state) => state.HomeMovieListReducer);

  useEffect(() => {
    dispatch(homeMovieListFetchData());
  }, []);

  const renderMovies = () => {
    if (loading) {
      return (
        <>
          <div className="tab-pane fade show active" id="now-showing" role="tabpanel" aria-labelledby="now-showing-tab">
            <Loader />
          </div>
          <div className="tab-pane fade" id="coming-soon" role="tabpanel" aria-labelledby="coming-soon-tab">
            <Loader />
          </div>
        </>
      );
    } else {
      const nowShowingList = [...movieList].filter((movie) => movie.dangChieu === true);
      const comingSoonList = [...movieList].filter((movie) => movie.sapChieu === true);
      return (
        <>
          <div className="tab-pane fade show active" id="now-showing" role="tabpanel" aria-labelledby="now-showing-tab">
            <div className="now-showing-list row">
              {nowShowingList.map((movie) => (
                <Movie key={movie.maPhim} movie={movie} />
              ))}
            </div>
          </div>
          <div className="tab-pane fade" id="coming-soon" role="tabpanel" aria-labelledby="coming-soon-tab">
            <div className="coming-soon-list row">
              {comingSoonList.map((movie) => (
                <Movie key={movie.maPhim} movie={movie} />
              ))}
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <section className="movie-list container mt-4" id="movie-list">
      <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="now-showing-tab"
            data-toggle="pill"
            data-target="#now-showing"
            type="button"
            role="tab"
            aria-controls="now-showing"
            aria-selected="true">
            NOW SHOWING
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="coming-soon-tab"
            data-toggle="pill"
            data-target="#coming-soon"
            type="button"
            role="tab"
            aria-controls="coming-soon"
            aria-selected="false">
            COMING SOON
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {renderMovies()}
      </div>
    </section>
  );
}

export default MovieList;
