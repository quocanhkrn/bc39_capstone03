import api from "utils/apiUtil";
import * as TYPES from "./types";

export const movieShowtimesFetchData = (movieId) => {
  return (dispatch) => {
    dispatch(actMovieShowtimesRequest());
    api
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`)
      .then((result) => {
        const heThongRapChieu = result.data.content.heThongRapChieu;

        let heThongRapChieuClone = [];

        heThongRapChieu.forEach((heThongRap) => {
          let danhSachCumRapChieu = [];

          heThongRap.cumRapChieu.forEach((cumRap) => {
            let danhSachNgayChieu = [];

            cumRap.lichChieuPhim.forEach((lichChieu) => {
              danhSachNgayChieu.push(lichChieu.ngayChieuGioChieu.substr(0, lichChieu.ngayChieuGioChieu.indexOf("T")));
            });

            danhSachNgayChieu = [...new Set(danhSachNgayChieu)];

            danhSachNgayChieu.forEach((ngayChieu, index) => {
              let danhSachLichChieu = [];

              cumRap.lichChieuPhim.forEach((lichChieu) => {
                if (lichChieu.ngayChieuGioChieu.substr(0, lichChieu.ngayChieuGioChieu.indexOf("T")) === ngayChieu) {
                  danhSachLichChieu.push({
                    maLichChieu: lichChieu.maLichChieu,
                    gioChieu: lichChieu.ngayChieuGioChieu.substr(lichChieu.ngayChieuGioChieu.indexOf("T") + 1, lichChieu.ngayChieuGioChieu.length),
                  });
                }
              });

              danhSachNgayChieu[index] = {
                ngayChieu,
                lichChieu: danhSachLichChieu,
              };
            });

            danhSachCumRapChieu.push({
              maCumRap: cumRap.maCumRap,
              tenCumRap: cumRap.tenCumRap,
              lichChieuPhim: danhSachNgayChieu,
            });
          });

          heThongRapChieuClone.push({
            maHeThongRap: heThongRap.maHeThongRap,
            tenHeThongRap: heThongRap.tenHeThongRap,
            cumRapChieu: danhSachCumRapChieu,
          });
        });

        dispatch(actMovieShowtimesSuccess(heThongRapChieuClone));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const actMovieShowtimesRequest = () => {
  return { type: TYPES.MOVIE_SHOWTIMES_REQUEST };
};

export const actMovieShowtimesSuccess = (data) => {
  return { type: TYPES.MOVIE_SHOWTIMES_SUCCESS, payload: data };
};

export const actMovieShowtimesFail = (error) => {
  return { type: TYPES.MOVIE_SHOWTIMES_FAIL, payload: error };
};
