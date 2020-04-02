import { connect } from "react-redux";
import React, { useEffect } from "react";
import Axios from "axios";
import SideNavBar from "../Component/TimelineComponents/SideNavBarComponents/SideNavBar";
import TimelineComp from "../Component/TimelineComponents/TimelineSubComp/TimelineComp";
import { useState } from "react";
import { url } from "../config/url";
import { setCategories } from "../actions/categoryAction";
const TimelineScreen = ({ setCategories }) => {
  const [refereshUpload, setRefereshUpload] = useState(false);
  const changeOnUploading = value => {
    setRefereshUpload(value); //this will send new props to post and new post will be loaded in webpage
  };
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    Axios.get(url + "/category/getCategories").then(result => {
      if (result.data) {
        setCategories(result.data);
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
    setCategories: data => {
      dispatch(setCategories(data));
    }
  };
};
export default connect(null, mapDispatchToProps)(TimelineScreen);
