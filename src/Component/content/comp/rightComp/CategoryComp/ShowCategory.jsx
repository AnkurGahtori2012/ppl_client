import React from "react";
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
const ShowCategory = props => {
  //   this.state = {
  //     categories: []
  //   };
  // }
  // componentDidUpdate(prevProps) {
  //   if (this.props.categories !== prevProps.categories) {
  //     this.setState({ categories: this.props.categories });
  //   }
  // }
  const handleChange = e => {
    let category = e.target.parentNode.parentNode.outerHTML
      .split("</span></div>")[0]
      .split("</span><span>")[1];
    props.CATEGORY_CHANGE({ categoriesToDisplay: category });
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
            {props.categories.map((value, id) => (
              <li key={id}>
                <div onClick={handleChange}>
                  <span className="list_icon">
                    <img
                      alt="Img"
                      src={"http://192.168.100.189:8082/post/" + value.image}
                      alt="up"
                      style={{ maxHeight: "40px",maxWidth:"40px" }}
                    />
                  </span>
                  <span>{value.category}</span>
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
