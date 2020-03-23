import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { categories: state.categoryReducer.categories };
};

const UploadPostComp = props => {
  const handleFormSubmit = e => {
    let data = JSON.parse(localStorage.getItem("details"));
    e.preventDefault();
    let formdata = new FormData(e.target);
    formdata.append("username", data["username"]);
    formdata.append("userID", data["_id"]);
    Axios.post("http://192.168.100.189:8082/post/create", formdata)
      .then(() => {
        // alert("sadasd")
        props.handleUpload(true);
        props.history.push("/timeline");
      })
      .catch(errr => {
        alert("error");
      });
  };
  return (
    <>
      <div className="login_sec">
        <h1>Upload Post</h1>
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
                {props.categories.map((value, id) => (
                  <option key={id}>{value.category}</option>
                ))}
                <option>others</option>
              </select>
            </li>
            <li>
              <input type="submit" />
            </li>
          </ul>
        </form>
        <ul>
          <li>
            <Link to="/timeline">
              <input type="submit" value="Back" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default connect(mapStateToProps, null)(UploadPostComp);
