import React from "react";
import { connect } from "react-redux";
const Profile = ({ currentUser }) => {
  return (
    <div className="contnt_1">
      <div className="list_1">
        <ul>
          <li>
            <input type="checkbox" className="chk_bx" />
            Friends
          </li>
          <li>
            <input type="checkbox" className="chk_bx" />
            Flaged
          </li>
        </ul>
      </div>
      <div className="timeline_div">
        <div className="timeline_div1">
          <div className="profile_pic">
            <img alt="Img" src="/images/timeline_img1.png" />
            <div className="profile_text">
              <a href={window.location.href}>Change Profile Pic</a>
            </div>
          </div>
          <div className="profile_info">
            <div className="edit_div">
              <a href={window.location.href}>
                Edit <img alt="Img" src="/images/timeline_img.png" />
              </a>
            </div>
            <div className="profile_form">
              <ul>
                <li>
                  <div className="div_name1">Name :</div>
                  <div className="div_name2">
                    {currentUser.fname + " " + currentUser.lname}
                  </div>
                </li>
                <li>
                  <div className="div_name1">Sex :</div>
                  <div className="div_name2">Male</div>
                </li>
                <li>
                  <div className="div_name1">Description :</div>
                  <div className="div_name3">
                    This is an example of a comment. You can create as many
                    comments like this one or sub comments as you like and
                    manage all of your content inside Account.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="timeline_div2">
          <ul>
            <li>
              <a href={window.location.href} className="active">
                Timeline{" "}
              </a>
            </li>
            <li>
              <a href={window.location.href}>About </a>
            </li>
            <li>
              <a href={window.location.href}>Album</a>
            </li>
            <li>
              <a href={window.location.href}> Pets</a>
            </li>
            <li>
              <a href={window.location.href}>My Uploads </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
let matchStateToProps = state => {
  return { currentUser: state.userReducer.userInfo };
};
export default connect(matchStateToProps, null)(Profile);
