import React from "react";
import Carousel from "./components/Carousel";
import MovieList from "./components/MovieList";
import Showtimes from "./components/Showtimes";

function Homepage() {
  document.title = "CYBERCINEMA | TOP NOTCH BOX OFFICE";

  return (
    <>
      <Carousel />
      <Showtimes />
      <MovieList />
    </>
  );
}

export default Homepage;
