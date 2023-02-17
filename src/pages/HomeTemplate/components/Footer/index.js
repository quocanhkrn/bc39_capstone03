import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="mt-4">
      <div className="container row g-3 m-auto">
        <div className="about col-12 col-md-9 col-xl-6">
          <h4 className="mb-2">
            <span>CYBER</span>
            <span>CINEMA</span>
          </h4>
          <p>
            <i className="fa-solid fa-location-dot" />
            4929 Grove Street, Huntington, New York, U.S
          </p>
          <p>
            <i className="fa-solid fa-phone" />
            631-823-4445
          </p>
          <p>COPYRIGHT © 2022 CYBERCINEMA INC. All RIGHTS RESERVED.</p>
        </div>
        <div className="follow col-12 col-md-3 col-xl-4 my-4 my-md-0 text-center">
          <h4 className="mb-2">FOLLOW US</h4>
          <div className="follow__links d-flex justify-content-center">
            <a href="#">
              <i className="fa-brands fa-youtube" />
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter" />
            </a>
          </div>
        </div>
        <div className="terms-conditions col my-md-4 my-xl-0 text-center text-lg-start">
          <h4 className="mb-2">TERMS &amp; CONDITIONS</h4>
          <ul>
            <li>
              <a href="#">Conditions of Website Use</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Payment Policy</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">F.A.Q</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
