import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import Axios from "axios";
import { setUserInfo } from "../../../actions/userAction";
import { url } from "../../../config/url";
const Profile = ({ currentUser, setUserInfo }) => {
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
            <img
              alt="Img"
              src={url + "/profile/" + currentUser.image || "/images/pic.png"}
            />
            <div className="profile_text">
              <MyDropzone setUserInfo={setUserInfo} currentUser={currentUser} />
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
                    {currentUser.firstName + " " + currentUser.lastName}
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
const matchStateToProps = state => {
  return { currentUser: state.userReducer.userInfo };
};
const MyDropzone = ({ setUserInfo, currentUser }) => {
  const onDrop = useCallback(acceptedFiles => {
    let formData = new FormData();
    formData.append("userID", currentUser._id);
    formData.append("image", acceptedFiles[0]);
    Axios.post(url + "/user/updateProfilePic", formData).then(result => {
      if (result.data) {
        setUserInfo(result.data);
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} name="image" />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Change Profile</p>}
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  setUserInfo: payload => dispatch(setUserInfo(payload))
});
export default connect(matchStateToProps, mapDispatchToProps)(Profile);
