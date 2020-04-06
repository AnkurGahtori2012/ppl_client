import React from "react";
import { connect } from "react-redux";
import { url } from "../../../config/url";
import { changeCategory } from "../../../actions/categoryAction";
const ShowCategory = ({ changeCategory, categories }) => {
  const handleChange = e => {
    let category = e.target.parentNode.parentNode.outerHTML
      .split("</span></div>")[0]
      .split("</span><span>")[1];
    if (category !== "all" && category !== "All") {
      for (let i of categories) {
        if (i["categoryName"] === category) {
          category = i;
          break;
        }
      }
    } else {
      category = { categoryName: "ALL" };
    }
    changeCategory(category);
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
const mapStateToProps = state => {
  return { categories: state.categoryReducer.categories };
};
const mapDispatchToProps = dispatch => {
  return {
    changeCategory: data => dispatch(changeCategory(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowCategory);
