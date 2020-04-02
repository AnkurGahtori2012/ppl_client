import React from "react";
import AddCategoryComp from "./AddCategoryComp";
import ShowCategory from "./ShowCategory";
import { connect } from "react-redux";
import { useState } from "react";
import UploadPostComp from "../../Form/UploadPostForm";
import { useEffect } from "react";
import Axios from "axios";
import { url } from "../../../config/url";
const SideNavBar = ({ handleUpload, categories }) => {
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showAddCategoryPanel, setShowAddCategoryPanel] = useState(false);
  const [featuredPost, setFeaturedPost] = useState([]);
  let handleClick = () => {
    if (categories.length === 0) {
      alert("add category First");
    } else {
      setShowUploadPanel(true);
    }
  };
  useEffect(() => {
    Axios.get(url + "/post/getPost", {
      params: {
        skip: 0,
        limit: 3,
        sort: "date",
        order: "1",
        category: "Fake_ID"
      }
    }).then(result => {
      if (result.data) {
        setFeaturedPost(result.data);
      }
    });
  }, []);
  return (
    <>
      {showUploadPanel ? (
        <UploadPostComp
          setShowUploadPanel={setShowUploadPanel}
          handleUpload={handleUpload}
        />
      ) : null}
      <div className="content_rgt">
        <div className="rght_btn">
          {" "}
          <span className="rght_btn_icon">
            <img src="/images/btn_iconb.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="/images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a
            onClick={() => {
              setShowAddCategoryPanel(true);
            }}
          >
            Add Categories
          </a>{" "}
        </div>
        <div className="rght_btn">
          {" "}
          <span className="rght_btn_icon">
            <img src="/images/btn_icona.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="/images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a onClick={handleClick}>Upload Post</a>{" "}
        </div>

        {showAddCategoryPanel ? (
          <AddCategoryComp setShowAddCategoryPanel={setShowAddCategoryPanel} />
        ) : null}
        <ShowCategory />
        <div className="rght_cate">
          <div className="rght_cate_hd" id="opn_cat_bg">
            Featured
          </div>
          <div className="sub_dwn">
            {featuredPost.map((post, index) => (
              <div className="feat_sec" key={index}>
                <div className="feat_sec_img">
                  <img
                    alt="Img"
                    src={url + "/post/" + post.image}
                    alt="image"
                  />
                </div>
                <div className="feat_txt">{post.title}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{post.category.categoryName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = state => {
  return { categories: state.categoryReducer.categories };
};
export default connect(mapStateToProps, null)(SideNavBar);
