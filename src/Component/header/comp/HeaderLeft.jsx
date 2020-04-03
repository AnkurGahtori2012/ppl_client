import React from "react";
import { Link } from "react-router-dom";
const HeaderLeft = ({ isLoggedIn }) => {
  return (
    <div className="header_lft">
      <div className="logo">
        <Link to="/timeline">
          <img alt="Img" src="/images/logo.png" />
        </Link>
      </div>
      <div className="navigatn">
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a> E-Coupons </a>
              </li>
              <li>
                <a>E-Brands </a>
              </li>
              <li>
                <a> Resuse Market </a>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderLeft;
