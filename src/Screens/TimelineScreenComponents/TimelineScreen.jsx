import { connect } from "react-redux";
import React, { useEffect } from "react";
import Axios from "axios";
import SideNavBar from "./SideNavBarComponents/SideNavBar";
import TimelineComp from "./TimelineComp";

const TimelineScreen = props => {
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    Axios.get("http://localhost:8082/category/getCategories").then(result => {
      if (result.data) {
        props.GET_CATEGORY({ categories: result.data });
      } else {
        alert("no category to show");
      }
    });
  };

  return (
    <div className="container">
      <div className="content">
        <SideNavBar {...props} />
        <TimelineComp {...props} />
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
