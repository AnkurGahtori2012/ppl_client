import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions/userAction";
const HeaderRight = props => {
  return (
    <div className="header_rgt">
      <div className="flag_div">
        <img alt="Img" src="/images/flag.png" />
      </div>
      <input type="text" placeholder="Search" className="txt_box" />
      <div className="info_div">
        <Status {...props} />
      </div>
    </div>
  );
};

function Status({ loggedIn, logout }) {
  if (loggedIn) {
    return (
      <div className="pro_info pull-right">
        <div className="pro_icn">
          <img src="/images/pic_small.png" />
        </div>
        <div className="pro_txt">
          <b className="caret" />
        </div>
        <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
          <li>
            <a
              tabIndex={-1}
              href=""
              onClick={() => {
                localStorage.removeItem("userToken");
                logout();
              }}
            >
              Logout
            </a>
          </li>
          <li>
            <a tabIndex={-1} href="#">
              Message Box
            </a>
          </li>
          <li>
            <a tabIndex={-1} href="#">
              Change Language
            </a>
          </li>
          <li className="divider" />
          <li>
            <a tabIndex={-1} href="#">
              <input type="text" placeholder="search" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
  return <></>;
}

const mapStateToProps = state => {
  return { loggedIn: state.loginReducer.loggedIn };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderRight);
