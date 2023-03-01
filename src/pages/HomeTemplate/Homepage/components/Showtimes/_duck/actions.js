import api from "utils/apiUtil";
import * as TYPES from "./types";

export const showtimesFetchData = () => {
  return (dispatch) => {
    dispatch(actShowtimesRequest());
    let danhSachPhim = [];
    api
      .get("QuanLyPhim/LayDanhSachPhim?maNhom=GP03")
      .then((result) => {
        const data = result.data.content;

        data.forEach((phim) => {
          if (phim.dangChieu) {
            const { maPhim, tenPhim } = phim;

            danhSachPhim.push({ maPhim, tenPhim, heThongRap: [] });
          }
        });
      })
      .then(() => {
        danhSachPhim.forEach((phim) => {
          const { maPhim } = phim;
          api
            .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
            .then((result) => {
              const data2 = result.data.content;
              let heThongRap = [];

              data2.heThongRapChieu.forEach((heThong) => {
                const { maHeThongRap, tenHeThongRap } = heThong;
                let cumRapChieu = [];

                heThong.cumRapChieu.forEach((cumRap) => {
                  const { maCumRap, tenCumRap } = cumRap;
                  const lichChieuPhim = [];

                  let danhSachNgayChieu = [];
                  cumRap.lichChieuPhim.forEach((lichChieu) => {
                    danhSachNgayChieu.push(lichChieu.ngayChieuGioChieu.substr(0, lichChieu.ngayChieuGioChieu.indexOf("T")));
                  });

                  danhSachNgayChieu = [...new Set(danhSachNgayChieu)];
                  danhSachNgayChieu.forEach((ngayChieu) => {
                    let lichChieu = [];

                    cumRap.lichChieuPhim.forEach((lichChieuPhim) => {
                      if (lichChieuPhim.ngayChieuGioChieu.substr(0, lichChieuPhim.ngayChieuGioChieu.indexOf("T")) === ngayChieu) {
                        const { maLichChieu } = lichChieuPhim;
                        const gioChieu = lichChieuPhim.ngayChieuGioChieu.substr(lichChieuPhim.ngayChieuGioChieu.indexOf("T") + 1);
                        lichChieu.push({ maLichChieu, gioChieu });
                      }
                    });

                    lichChieuPhim.push({ ngayChieu, lichChieu });
                  });

                  cumRapChieu.push({ maCumRap, tenCumRap, lichChieuPhim });
                });

                heThongRap.push({ maHeThongRap, tenHeThongRap, cumRapChieu });

                phim.heThongRap = heThongRap;
              });
            })
            .catch((error) => dispatch(actShowtimesFail(error.response.data.content)));
        });
      })
      .then(() => {
        dispatch(actShowtimesSuccess(danhSachPhim));
      })
      .catch((error) => console.log(error));
  };
};

export const actShowtimesRequest = () => {
  return { type: TYPES.SHOWTIMES_REQUEST };
};

export const actShowtimesSuccess = (data) => {
  return {
    type: TYPES.SHOWTIMES_SUCCESS,
    payload: data,
  };
};

export const actShowtimesFail = (error) => {
  return {
    type: TYPES.SHOWTIMES_FAIL,
    payload: error,
  };
};
