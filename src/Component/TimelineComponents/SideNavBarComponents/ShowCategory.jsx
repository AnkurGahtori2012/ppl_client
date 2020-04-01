import React from "react";
import { connect } from "react-redux";
import { url } from "../../../config/url";
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
const ShowCategory = ({ CATEGORY_CHANGE, categories }) => {
  const handleChange = e => {
    let category = e.target.parentNode.parentNode.outerHTML
      .split("</span></div>")[0]
      .split("</span><span>")[1];
    CATEGORY_CHANGE({ categoriesToDisplay: category });
  };
  return (
    <>
      <div className="rght_cate">
        <div className="rght_cate_hd" id="rght_cat_bg">
          Categories
        </div>
        <div className="rght_list">
          <ul>
            <li>
              <div onClick={handleChange}>
                <span className="list_icon">
                  <img
                    alt="AllImage"
                    src="/post/all.png"
                    style={{ maxHeight: "40px" }}
                  />
                </span>
                <span>All</span>
              </div>
            </li>
            {categories.map((value, id) => (
              <li key={id}>
                <div onClick={handleChange}>
                  <span className="list_icon">
                    <img
                      alt="Img"
                      src={url + "/post/" + value.image}
                      alt="up"
                      style={{ maxHeight: "40px", maxWidth: "40px" }}
                    />
                  </span>
                  <span>{value.categoryName}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowCategory);
