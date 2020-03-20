import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { loggedIn: state.loginReducer.loggedIn};
};
const mapDispatchToProps = dispatch => {
  return {
    LOGIN: () => dispatch({ type: "LOGIN" }),
    LOGOUT: () => dispatch({ type: "LOGOUT" })
  };
};
const HeaderRight = props => {
  return (
    <div className="header_rgt">
      <div className="flag_div">
        <img alt="Img" src="/images/flag.png" />
      </div>
      <input type="text" placeholder="Search" className="txt_box" />
      {/* <div className="msg_box">
        <a href={window.location.href}>
          <span className="msg_count">100</span>
        </a>
      </div> */}
      <div className="info_div">
        <Status props={props} />
      </div>
    </div>
  );
};

function Status(props) {
  console.log("current logged in status", props);
  if (props.props.loggedIn) {
    return (
      <div
        className="info_div1"
        onClick={() => {
          localStorage.removeItem("details");
          props.props.LOGOUT();
        }}
      >
        <Link to="/">logout</Link>
      </div>
    );
  }
  return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight);
