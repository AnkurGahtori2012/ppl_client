import { connect } from "react-redux";
import React, { useEffect } from "react";
import Axios from "axios";
import SideNavBar from "./SideNavBarComponents/SideNavBar";
import TimelineComp from "./TimelineSubComp/TimelineComp";
import { useState } from "react";

const TimelineScreen = ({ GET_CATEGORY }) => {
  const [refereshUpload, setRefereshUpload] = useState(false);
  const changeOnUploading = value => {
    setRefereshUpload(value); //this will send new props to post and new post will be loaded in webpage
  };
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    Axios.get("http://localhost:8082/category/getCategories").then(result => {
      if (result.data) {
        GET_CATEGORY({ categories: result.data });
      } else {
        alert("no category to show");
      }
    });
  };
  return (
    <div className="container">
      <div className="content">
        <SideNavBar handleUpload={changeOnUploading} />
        <TimelineComp
          handleUpload={changeOnUploading}
          uploadFlag={refereshUpload}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    GET_CATEGORY: data => {
      dispatch({
        type: "GET_CATEGORY",
        categories: data.categories
      });
    }
  };
};
export default connect(null, mapDispatchToProps)(TimelineScreen);
