import React from "react";
import Carousel from "./components/Carousel";
import MovieList from "./components/MovieList";

function Homepage() {
  document.title = "CYBERCINEMA | TOP NOTCH BOX OFFICE";

  return (
    <>
      <Carousel />
      <MovieList />
    </>
  );
}

export default Homepage;
