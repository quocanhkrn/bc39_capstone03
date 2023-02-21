import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reservationSendRequest } from "./_duck/actions";

function Seats(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { maLichChieu, seatingPlan } = props;
  const [danhSachVe, setDanhSachVe] = useState([]);
  const ticketInfo = useRef({ maLichChieu, danhSachVe: [] });
  const ticketTotal = useRef(0);

  let seatRows = [];
  for (let row = 1; row <= seatingPlan.length / 10; row++) {
    seatRows.push([]);
    for (let col = 0; col < 10; col++) {
      seatRows[row - 1].push(seatingPlan[(row - 1) * 10 + col]);
    }
  }

  const generateSeatBtnClass = (seat) => {
    let className = ["seat"];
    className.push("rounded");
    if (seat.loaiGhe === "Vip") {
      className.push("vip");
    }
    if (seat.daDat) {
      className.push("unavailable");
    }
    return className.join(" ");
  };

  const countTotal = () => {
    ticketTotal.current = ticketInfo.current.danhSachVe.reduce((total, ve) => {
      return total + ve.giaVe;
    }, 0);
  };

  const handleSeatOnClick = (seat, e) => {
    const { maGhe, tenGhe, loaiGhe, giaVe } = seat;

    e.target.classList.toggle("choosing");

    if (!danhSachVe.some((ve) => ve.tenGhe === tenGhe)) {
      ticketInfo.current.danhSachVe.push({ maGhe, giaVe });

      countTotal();

      setDanhSachVe((prev) => {
        let newLoaiGhe = "";
        switch (loaiGhe) {
          case "Vip":
            newLoaiGhe = "VIP";
            break;

          default:
            newLoaiGhe = "STANDARD";
            break;
        }

        return [...prev, { maGhe, tenGhe, loaiGhe: newLoaiGhe, giaVe }];
      });
    } else {
      unchooseSeat(maGhe);
    }
  };

  const unchooseSeat = (maGhe) => {
    const index = ticketInfo.current.danhSachVe.findIndex((ve) => ve.maGhe === maGhe);

    ticketInfo.current.danhSachVe.splice(index, 1);

    countTotal();

    setDanhSachVe((prev) => {
      let newDanhSachVe = [...prev];
      newDanhSachVe.splice(index, 1);
      return [...newDanhSachVe];
    });
  };

  const handleOnSubmit = () => {
    dispatch(reservationSendRequest(navigate, ticketInfo.current));
  };

  return (
    <div className="seating-booking row">
      <div className="reservation-details col-12 col-lg-4">
        <table className="mx-auto bg-light text-dark text-right">
          <thead>
            <tr>
              <th>Seat No.</th>
              <th className="text-center">Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {danhSachVe.map((ve) => {
              const { maGhe, tenGhe, loaiGhe, giaVe } = ve;
              return (
                <tr key={tenGhe}>
                  <td className="text-center">{tenGhe}</td>
                  <td className="text-center">{loaiGhe}</td>
                  <td>{giaVe.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        unchooseSeat(maGhe);
                      }}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>TOTAL</td>
              <td colSpan={2}>{ticketTotal.current.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <button className="btn btn-danger w-100" disabled={!danhSachVe.length > 0} onClick={handleOnSubmit}>
                  ĐẶT VÉ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="seating-plan col-12 col-lg-8 mt-5 mt-lg-0">
        <div className="screen w-100 mb-3 py-1 rounded-pill text-center">SCREEN</div>
        <table className="mx-auto text-center">
          <tbody>
            {seatRows.map((row, index) => (
              <tr key={index}>
                {row.map((seat) => {
                  return (
                    <td key={seat.maGhe}>
                      <button
                        className={generateSeatBtnClass(seat)}
                        onClick={(e) => {
                          if (!seat.daDat) {
                            handleSeatOnClick(seat, e);
                          }
                        }}>
                        {seat.tenGhe}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr></tr>
            <tr></tr>
            <tr>
              <td>
                <button className="guide unavailable rounded"></button>
              </td>
              <td className="text-left" colSpan={2}>
                ĐÃ ĐẶT
              </td>
              <td>
                <button className="guide vip rounded"></button>
              </td>
              <td className="text-left" colSpan={2}>
                GHẾ VIP
              </td>
              <td>
                <button className="guide choosing rounded"></button>
              </td>
              <td className="text-left" colSpan={3}>
                ĐANG CHỌN
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Seats;
