import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { categories: state.categoryReducer.categories };
};
const mapDispatchToProps = dispatch => {
  return {
    CATEGORY_CHANGE: data =>
      dispatch({
        type: "CATEGORY_CHANGE",
        categoriesToDisplay: data.categoriesToDisplay
      }),
    GET_CATEGORY: data => {
      dispatch({
        type: "GET_CATEGORY",
        categories: data.categories
      });
    }
  };
};
function AddCategoryComp(props) {
  const [categoryStatus, setCategoryStatus] = useState("Category");
  const [categoryColor, setcategoryColor] = useState("");
  const handleChange = () => {
    setcategoryColor("");
    setCategoryStatus("Category");
  };
  const handleFormSubmit = e => {
    let data = JSON.parse(localStorage.getItem("details"));
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("userID", data["_id"]);
    Axios.post(
      "http://localhost:8082/category/addCategory",
      formData
    ).then(result => {
      if (result.data) {
        let newCategories = [...props.categories];
        newCategories.push(result.data);
        props.GET_CATEGORY({
          categories: newCategories
        });
        props.history.push("/timeline");
      } else {
        setcategoryColor("#ffcccb");
        setCategoryStatus("Category already Exist");
      }
    });
  };

  return (
    <>
      <div className="login_sec">
        <h1>Add Category</h1>
        <form onSubmit={handleFormSubmit}>
          <ul>
            <li>
              <span>Select Image</span>
              <input type="file" name="image" required="required" />
            </li>
            <li style={{ backgroundColor: categoryColor }}>
              <span>{categoryStatus}</span>
              <input
                required="required"
                onChange={handleChange}
                type="text"
                name="category"
                placeholder="Enter Category Name"
              />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryComp);
