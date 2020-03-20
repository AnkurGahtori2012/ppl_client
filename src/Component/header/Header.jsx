import React from "react";
import HeaderLeft from "./comp/HeaderLeft";
import HeaderRight from "./comp/HeaderRight";

function Header(props) {
  return (
    <div className="header">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}
export default Header;
