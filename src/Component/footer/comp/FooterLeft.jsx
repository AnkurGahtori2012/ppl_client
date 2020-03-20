import React from "react";
export default class FooterLeft extends React.Component {
  render() {
    return (
      <div className="footr_lft">
        <div className="footer_div1">
          Copyright © Pet-Socail 2014 All Rights Reserved
        </div>
        <div className="footer_div2">
          <a href={window.location.href}>Privacy Policy </a>|{" "}
          <a href={window.location.href}> Terms &amp; Conditions</a>
        </div>
      </div>
    );
  }
}
