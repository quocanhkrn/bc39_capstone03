import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import api from "utils/apiUtil";
import { actAddMovieSuccess, actUpdateMovieSuccess, addMovieRequest, updateMovieRequest } from "./_duck/action";

const MovieForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieId = useParams().id;
  const [movie, setMovie] = useState({
    maNhom: "GP03",
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
    hinhAnhSrc: "",
    hinhAnhBlob: null,
  });
  const {
    AddMovieReducer: { loading: addLoading, error: addError },
    UpdateMovieReducer: { loading: updateLoading, error: updateError },
  } = useSelector((state) => state.AdminMovieReducer);
  let loading, error;
  const submitBtn = useRef();

  useEffect(() => {
    if (movieId) {
      dispatch(actUpdateMovieSuccess(null));
      api
        .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
        .then((result) => {
          const { maPhim, tenPhim, moTa, trailer, ngayKhoiChieu, sapChieu, dangChieu, hot, danhGia, hinhAnh } = result.data.content;
          setMovie((prevMovie) => {
            return {
              ...prevMovie,
              maPhim,
              tenPhim,
              moTa,
              trailer,
              ngayKhoiChieu: ngayKhoiChieu.substring(0, ngayKhoiChieu.indexOf("T")),
              sapChieu,
              dangChieu,
              hot,
              danhGia,
              hinhAnh,
              hinhAnhSrc: hinhAnh,
              hinhAnhBlob: null,
            };
          });
        })
        .catch((error) => error.log(error.reponse.data.content));
    } else {
      dispatch(actAddMovieSuccess(null));
    }
  }, [movieId]);

  if (movieId) {
    document.title = "UPDATE MOVIE | CYBERCINEMA";
    submitBtn.current = (
      <button className="btn btn-warning w-100" type="submit">
        <i className="fa-solid fa-pen-to-square mr-2" />
        UPDATE
      </button>
    );
    [loading, error] = [updateLoading, updateError];
  } else {
    document.title = "NEW MOVIE | CYBERCINEMA";
    submitBtn.current = (
      <button className="btn btn-warning w-100" type="submit">
        <i className="fa-solid fa-plus mr-2" />
        ADD
      </button>
    );
    [loading, error] = [addLoading, addError];
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
        return { ...prevMovie, hinhAnh: file.name, hinhAnhSrc: imageUrl, hinhAnhBlob: imgBlob };
      });
    });
    reader.readAsArrayBuffer(file);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let movieFormData = new FormData();
    for (const key in movie) {
      if (["hinhAnh", "hinhAnhSrc", "hinhAnhBlob"].indexOf(key) === -1) {
        if (key === "ngayKhoiChieu") {
          let dateParts = movie.ngayKhoiChieu.split("-");
          movieFormData.append(key, `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`);
        } else {
          movieFormData.append(key, movie[key]);
        }
      }
    }
    if (movie.hinhAnhBlob) movieFormData.append("hinhAnh", movie.hinhAnhBlob, movie.hinhAnh);
    if (movieId) {
      dispatch(updateMovieRequest(movieFormData, navigate));
    } else {
      dispatch(addMovieRequest(movieFormData, navigate));
    }
  };

  return (
    <section className="container mt-5 pt-3">
      <h2>{movieId ? "UPDATE" : "ADD NEW MOVIE"}</h2>
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
      <form onSubmit={handleOnSubmit}>
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
            <input type="date" className="form-control" required name="ngayKhoiChieu" value={movie.ngayKhoiChieu} onChange={handleOnChange} />
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
            <input type="number" min={1} max={10} className="form-control" required name="danhGia" value={movie.danhGia} onChange={handleOnChange} />
          </div>
        </div>
        <div className="form-group row no-gutters">
          <label className="col-12 col-md-2 col-form-label mr-2 text-md-right">Poster</label>
          <div className="col">
            <input type="file" className="form-control-file mb-3" name="hinhAnh" onChange={handleOnChangePoster} />
            <img src={movie.hinhAnhSrc} width={"100px"} />
          </div>
        </div>
        {submitBtn.current}
      </form>
    </section>
  );
};

export default MovieForm;
