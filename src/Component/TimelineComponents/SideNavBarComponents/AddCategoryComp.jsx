import React, { useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { url } from "../../../config/url";
import { setCategories } from "../../../actions/categoryAction";
const AddCategoryComp = ({
  currentUser,
  categories,
  setShowAddCategoryPanel,
  setCategories
}) => {
  const [categoryStatus, setCategoryStatus] = useState("Category");
  const [categoryColor, setcategoryColor] = useState("");
  const handleChange = () => {
    setcategoryColor("");
    setCategoryStatus("Category");
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("userID", currentUser._id);
    Axios.post(url + "/category/addCategory", formData).then(result => {
      if (result.data) {
        let newCategories = [...categories];
        newCategories.push(result.data);
        setCategories(newCategories);
        setShowAddCategoryPanel(false);
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
                name="categoryName"
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
            <a
              onClick={() => {
                setShowAddCategoryPanel(false);
              }}
              >
              <input type="submit" value="Back" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer.categories,
    currentUser: state.userReducer.userInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCategories: data => {
      dispatch(setCategories(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryComp);
