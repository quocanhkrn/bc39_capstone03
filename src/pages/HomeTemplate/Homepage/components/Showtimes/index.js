import Loader from "components/Loader";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { showtimesFetchData } from "./_duck/actions";

function Showtimes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data: danhSachPhim, error } = useSelector((state) => state.HomeShowtimesReducer);
  const [opts, setOpts] = useState({
    phim: null,
    heThongRap: null,
    chiNhanh: null,
    ngayChieu: null,
    lichChieu: null,
  });
  const [selectOpts, setSelectOpts] = useState({
    heThongRap: [],
    chiNhanh: [],
    ngayChieu: [],
    lichChieu: [],
  });

  useEffect(() => {
    dispatch(showtimesFetchData());
  }, []);

  useEffect(() => {
    if (danhSachPhim) {
      let heThongRap = [];
      let chiNhanh = [];
      let ngayChieu = [];
      let lichChieuPhim = [];

      danhSachPhim.forEach((phim) => {
        if (phim.maPhim.toString() === opts.phim) {
          phim.heThongRap.forEach((heThong) => {
            const { maHeThongRap, tenHeThongRap } = heThong;
            heThongRap.push({ maHeThongRap, tenHeThongRap });

            if (heThong.maHeThongRap === opts.heThongRap) {
              heThong.cumRapChieu.forEach((cumRap) => {
                const { maCumRap, tenCumRap } = cumRap;
                chiNhanh.push({ maCumRap, tenCumRap });

                if (cumRap.maCumRap === opts.chiNhanh) {
                  cumRap.lichChieuPhim.forEach((lichChieu) => {
                    ngayChieu.push(lichChieu.ngayChieu);

                    if (lichChieu.ngayChieu === opts.ngayChieu) {
                      lichChieu.lichChieu.forEach((lich) => {
                        const { maLichChieu, gioChieu } = lich;
                        lichChieuPhim.push({ maLichChieu, gioChieu });
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });

      setSelectOpts((prevSelectOpts) => {
        return { ...prevSelectOpts, heThongRap, chiNhanh, ngayChieu, lichChieu: lichChieuPhim };
      });
    }
  }, [opts]);

  const renderSubmitBtn = () => {
    if (localStorage.getItem("guest-account")) {
      return (
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <button
            className="btn btn-warning w-100"
            disabled={!opts.lichChieu}
            onClick={() => {
              navigate(`/reservation/${opts.lichChieu}`);
            }}>
            ĐẶT VÉ
          </button>
        </div>
      );
    } else {
      return (
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <button
            className="btn btn-warning w-100"
            onClick={() => {
              navigate(`/signin`);
            }}>
            ĐĂNG NHẬP ĐỂ ĐẶT VÉ
          </button>
        </div>
      );
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setOpts((prevOpts) => {
      return { ...prevOpts, [name]: value };
    });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <section className="showtimes container row no-gutters mx-auto mt-4" id="showtimes">
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <select className="w-100" name="phim" onChange={handleOnChange}>
            <option value="">Chọn phim</option>
            {danhSachPhim.map((phim) => {
              const { maPhim, tenPhim } = phim;
              return (
                <option key={maPhim} value={maPhim}>
                  {tenPhim}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <select className="w-100" name="heThongRap" onChange={handleOnChange}>
            <option value="">Chọn hệ thống rạp</option>
            {selectOpts.heThongRap.map((heThong) => {
              const { maHeThongRap, tenHeThongRap } = heThong;
              return (
                <option key={maHeThongRap} value={maHeThongRap}>
                  {tenHeThongRap}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <select className="w-100" name="chiNhanh" onChange={handleOnChange}>
            <option value="">Chọn chi nhánh</option>
            {selectOpts.chiNhanh.map((chiNhanh) => {
              const { maCumRap, tenCumRap } = chiNhanh;
              return (
                <option key={maCumRap} value={maCumRap}>
                  {tenCumRap}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <select className="w-100" name="ngayChieu" onChange={handleOnChange}>
            <option value="">Chọn ngày chiếu</option>
            {selectOpts.ngayChieu.map((ngay) => {
              return (
                <option key={ngay} value={ngay}>
                  {ngay}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 col-md-4 px-0 py-1 px-md-1 py-md-1">
          <select className="w-100" name="lichChieu" onChange={handleOnChange}>
            <option value="">Chọn giờ chiếu</option>
            {selectOpts.lichChieu.map((gio) => {
              return (
                <option key={gio.gioChieu} value={gio.maLichChieu}>
                  {gio.gioChieu}
                </option>
              );
            })}
          </select>
        </div>
        {renderSubmitBtn()}
      </section>
    );
  }
}

export default Showtimes;
