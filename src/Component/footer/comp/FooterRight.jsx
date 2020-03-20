import React from "react";
const FooterRight = () => {
  return (
    <div className="footr_rgt">
      <ul>
        <li>
          <a href={window.location.href}>
            <img alt="Img" src="/images/social_1.png" />
          </a>
        </li>
        <li>
          <a href={window.location.href}>
            <img alt="Img" src="/images/social_2.png" />
          </a>
        </li>
        <li>
          <a href={window.location.href}>
            <img alt="Img" src="/images/social_3.png" />
          </a>
        </li>
        <li>
          <a href={window.location.href}>
            <img alt="Img" src="/images/social_4.png" />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default FooterRight;
