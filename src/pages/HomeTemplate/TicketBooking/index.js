import React from "react";
import { useParams } from "react-router-dom";

function Reservation() {
  const maLichChieu = useParams().id;
  console.log(maLichChieu);

  return <div>{maLichChieu}</div>;
}

export default Reservation;
