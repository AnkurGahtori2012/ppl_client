import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories,
    currentUser: state.userReducer.userInfo
  };
};

const UploadPostComp = ({
  currentUser,
  categories,
  handleUpload,
  setShowUploadPanel
}) => {
  const handleFormSubmit = e => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    formdata.append("postedBy", currentUser._id);
    Axios.post("http://localhost:8082/post/create", formdata)
      .then(() => {
        handleUpload(true);
        setShowUploadPanel(false);
      })
      .catch(errr => {
        alert("error");
      });
  };
  return (
    <>
      <div className="login_sec popup_sec" style={{ position: "fixed" }}>
        <div className="clos_btn">
          <img
            src="/images/clos.png"
            alt=""
            onClick={() => {
              setShowUploadPanel(false);
            }}
          />
        </div>
        <div className="pop_hdr">Upload Post</div>
        <form onSubmit={handleFormSubmit}>
          <ul>
            <li>
              <span>Select Image</span>
              <input type="file" name="image" />
            </li>
            <li>
              <span>Title</span>
              <input type="text" name="title" placeholder="Enter your text" />
            </li>
            <li>
              <span>category</span>
              <select name="category">
                {/* ----------------add category Logic here------------------------- */}
                {categories.map((value, id) => (
                  <option key={id} value={value._id}>
                    {value.category}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <input type="submit" />
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};
export default connect(mapStateToProps, null)(UploadPostComp);
