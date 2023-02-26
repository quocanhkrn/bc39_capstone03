import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieInfoRequest } from "./_duck/action";
import { useEffect } from "react";
import { useState } from "react";

const MovieForm = () => {
  const dispatch = useDispatch();
  const movieId = useParams().id;
  const { loading, data, error } = useSelector((state) => state.AdminGetMovieInfoReducer);
  const [movie, setMovie] = useState({
    maPhim: "",
    tenPhim: "",
    moTa: "",
    trailer: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 10,
    hinhAnh: "",
    hinhAnhBlob: null,
  });
  const submitBtn = useRef();

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieInfoRequest(movieId));
    }
  }, []);

  useEffect(() => {
    if (movieId && data) {
      const { maPhim, tenPhim, moTa, trailer, ngayKhoiChieu, sapChieu, dangChieu, hot, danhGia, hinhAnh } = data;
      setMovie({ maPhim, tenPhim, moTa, trailer, ngayKhoiChieu, sapChieu, dangChieu, hot, danhGia, hinhAnh, hinhAnhBlob: null });
    }
  }, [data]);

  if (movieId) {
    document.title = "UPDATE MOVIE | CYBERCINEMA";
    submitBtn.current = (
      <button className="btn btn-warning w-100" type="submit">
        <i className="fa-solid fa-pen-to-square mr-2" />
        UPDATE
      </button>
    );
  } else {
    document.title = "NEW MOVIE | CYBERCINEMA";
    submitBtn.current = (
      <button className="btn btn-warning w-100" type="submit">
        <i className="fa-solid fa-plus mr-2" />
        ADD
      </button>
    );
  }

  const handleOnChange = (e) => {
    const { name } = e.target;
    let value;
    if (e.target.hasOwnProperty("checked")) {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setMovie((prevMovie) => {
      return { ...prevMovie, [name]: value };
    });
  };

  const handleOnChangePoster = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imgBlob = new Blob([reader.result], { type: file.type });
      const imageUrl = URL.createObjectURL(imgBlob);
      const image = new Image();
      image.src = imageUrl;
      setMovie((prevMovie) => {
        return { ...prevMovie, hinhAnh: image.src, hinhAnhBlob: imgBlob };
      });
    });
    reader.readAsArrayBuffer(file);
  };

  if (loading) {
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
        <h2>{movieId ? "UPDATE" : "ADD NEW MOVIE"}</h2>
        <form>
          <div className="form-group row no-gutters">
            <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Title</label>
            <div className="col">
              <input type="text" className="form-control" required name="tenPhim" value={movie.tenPhim} onChange={handleOnChange} />
            </div>
          </div>
          <div className="form-group row no-gutters">
            <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Description</label>
            <div className="col">
              <textarea type="text" className="form-control" rows={5} required name="moTa" value={movie.moTa} onChange={handleOnChange} />
            </div>
          </div>
          <div className="form-group row no-gutters">
            <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Trailer</label>
            <div className="col">
              <input type="url" className="form-control" required name="trailer" value={movie.trailer} onChange={handleOnChange} />
            </div>
          </div>
          <div className="form-group row no-gutters">
            <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Release date</label>
            <div className="col">
              <input
                type="date"
                className="form-control"
                required
                name="ngayKhoiChieu"
                value={movie.ngayKhoiChieu.substring(0, movie.ngayKhoiChieu.indexOf("T"))}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="row no-gutters mb-3">
            <div className="col-2 d-none d-md-block mr-2"></div>
            <div className="col d-flex">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="showingSwitch"
                  name="dangChieu"
                  checked={movie.dangChieu}
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="showingSwitch">
                  Showing
                </label>
              </div>
              <div className="custom-control custom-switch mx-5">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="comingSoonSwitch"
                  name="sapChieu"
                  checked={movie.sapChieu}
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="comingSoonSwitch">
                  Coming soon
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="hotSwitch" name="hot" checked={movie.hot} onChange={handleOnChange} />
                <label className="custom-control-label" htmlFor="hotSwitch">
                  Hot
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row no-gutters">
            <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Rating</label>
            <div className="col">
              <input
                type="number"
                min={1}
                max={10}
                className="form-control"
                required
                name="danhGia"
                value={movie.danhGia}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="form-group row no-gutters">
            <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Poster</label>
            <div className="col">
              <input type="file" className="form-control-file mb-3" required name="hinhAnh" onChange={handleOnChangePoster} />
              <img src={movie.hinhAnh} width={"100px"} />
            </div>
          </div>
          {submitBtn.current}
        </form>
      </section>
    );
  }
};

export default MovieForm;
