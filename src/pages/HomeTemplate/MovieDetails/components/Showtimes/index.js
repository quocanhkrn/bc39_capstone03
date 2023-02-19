import Loader from "components/Loader";
import React, { useReducer } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieShowtimesFetchData } from "./_duck/actions";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Showtimes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data: heThongRapChieu, error } = useSelector((state) => state.MovieShowtimesReducer);
  const [opts, setOpts] = useState({ heThongRap: null, chiNhanh: null, ngayChieu: null, lichChieu: null });
  const [selectOpts, setSelectOpts] = useState({ chiNhanh: [], ngayChieu: [], lichChieuPhim: [] });

  useEffect(() => {
    dispatch(movieShowtimesFetchData(props.id));
  }, []);

  useEffect(() => {
    if (heThongRapChieu) {
      let chiNhanh = [];
      let ngayChieu = [];
      let lichChieuPhim = [];

      heThongRapChieu.forEach((heThongRap) => {
        if (heThongRap.maHeThongRap === opts.heThongRap) {
          heThongRap.cumRapChieu.forEach((cumRap) => {
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
      setSelectOpts((prevSelectOpts) => {
        return { ...prevSelectOpts, chiNhanh, ngayChieu, lichChieuPhim };
      });
    }
  }, [opts]);

  const renderSubmitBtn = () => {
    if (localStorage.getItem("guest-account")) {
      return (
        <div className="col px-0 py-1 px-md-1 py-md-0 mt-md-2">
          <button
            className="btn btn-warning w-100"
            onClick={() => {
              navigate(`/reservation/${opts.lichChieu}`);
            }}>
            ĐẶT VÉ
          </button>
        </div>
      );
    } else {
      return (
        <div className="col px-0 py-1 px-md-1 py-md-0 mt-md-2">
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
    setOpts((prevOpts) => {
      return { ...prevOpts, [e.target.name]: e.target.value || null };
    });
  };

  if (loading) {
    return <Loader />;
  } else {
    if (heThongRapChieu && heThongRapChieu.length !== 0) {
      return (
        <>
          <section className="showtimes mx-auto mt-5 row no-gutters">
            <div className="col-12 col-md-3 px-0 py-1 px-md-1 py-md-0">
              <select className="w-100" name="heThongRap" onChange={handleOnChange}>
                <option value="">Chọn hệ thống rạp</option>
                {heThongRapChieu.map((heThong) => {
                  const { maHeThongRap, tenHeThongRap } = heThong;
                  return (
                    <option key={maHeThongRap} value={maHeThongRap}>
                      {tenHeThongRap}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-12 col-md-3 px-0 py-1 px-md-1 py-md-0">
              <select className="w-100" name="chiNhanh" onChange={handleOnChange}>
                <option value="">Chọn chi nhánh</option>
                {selectOpts.chiNhanh.map((chiNhanh) => {
                  return (
                    <option key={chiNhanh.maCumRap} value={chiNhanh.maCumRap}>
                      {chiNhanh.tenCumRap}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-12 col-md-3 px-0 py-1 px-md-1 py-md-0">
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
            <div className="col-12 col-md-3 px-0 py-1 px-md-1 py-md-0">
              <select className="w-100" name="lichChieu" onChange={handleOnChange}>
                <option value="">Chọn giờ chiếu</option>
                {selectOpts.lichChieuPhim.map((lich) => {
                  return (
                    <option key={lich.maLichChieu} value={lich.maLichChieu}>
                      {lich.gioChieu}
                    </option>
                  );
                })}
              </select>
            </div>
            {renderSubmitBtn()}
          </section>
        </>
      );
    }
  }
}

export default Showtimes;
