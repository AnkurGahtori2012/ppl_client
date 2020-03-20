import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { loggedIn: state.loginReducer.loggedIn };
};
function HeaderLeft(props) {
  return (
    <div className="header_lft">
      <div className="logo">
        <Link to="/timeline">
          <img alt="Img" src="/images/logo.png" />
        </Link>
      </div>
      <div className="navigatn">
        <ul>
          <li>
            <Link to="/timeline/profile">
              {props.loggedIn ? (
                <span className="active">Profile</span>
              ) : (
                <></>
              )}
              {/* <span className="active">Profile</span> */}
            </Link>
          </li>
          {/* <li>
            <span> E-Coupons </span>
          </li>
          <li>
            <span>E-Brands </span>
          </li>
          <li>
            <span> Resuse Market </span>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
export default connect(mapStateToProps,null)(HeaderLeft);
