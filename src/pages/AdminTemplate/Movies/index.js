import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesRequest } from "./_duck/actions";
import styled from "styled-components";

const Movies = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.AdminMovieListReducer);

  const TruncatedParagraph = styled.p`
    width: 30vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `;

  const Button = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
  `;

  useEffect(() => {
    dispatch(getMoviesRequest());
  }, []);

  document.title = "MOVIES MANAGEMENT | CYBERCINEMA";

  if (loading || !data) {
    return (
      <section className="container d-flex justify-content-center mt-5 pt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </section>
    );
  } else {
    return (
      <section className="container mt-5 pt-3">
        <input type="text" class="form-control mb-1" placeholder="Search..."></input>
        <button className="btn btn-primary w-100 mb-1">+ ADD MOVIE</button>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Poster</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((movie) => {
                return (
                  <tr key={movie.maPhim}>
                    <td className="align-middle" scope="row">
                      {movie.maPhim}
                    </td>
                    <td>
                      <img className="align-middle" src={movie.hinhAnh} style={{ width: "40px" }} />
                    </td>
                    <td className="align-middle">{movie.tenPhim}</td>
                    <td className="align-middle">
                      <TruncatedParagraph>{movie.moTa}</TruncatedParagraph>
                    </td>
                    <td className="align-middle">
                      <Button className="text-primary">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button className="text-warning mx-2">
                        <i class="fa-solid fa-calendar-days"></i>
                      </Button>
                      <Button className="text-danger">
                        <i class="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
};

export default Movies;
