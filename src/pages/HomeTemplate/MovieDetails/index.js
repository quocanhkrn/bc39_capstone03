import React from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import MovieInfo from "./components/MovieInfo";
import Showtimes from "./components/Showtimes";

function MovieDetails() {
  const movieId = useParams().id;

  return (
    <main className="container my-0">
      <MovieInfo id={movieId} />
      <Showtimes id={movieId} />
    </main>
  );
}

export default MovieDetails;
