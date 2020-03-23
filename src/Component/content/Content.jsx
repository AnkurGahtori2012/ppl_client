import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import LoginComp from "./comp/rightComp/LoginComp";
import RegisterComp from "./comp/rightComp/RegisterComp";
import ForgetComp from "./comp/rightComp/ForgetComp";
import LoggedinComp from "./comp/rightComp/LoggedinComp";
import TimelineComp from "./comp/leftComp/TimelineComp";
import WelcomePage from "./comp/leftComp/WelcomePage";
const mapStateToProps = state => {
  return { loggedIn: state.loginReducer.loggedIn };
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
const Content = props => {
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    Axios.get("http://192.168.100.189:8082/category/getCategories").then(
      result => {
        if (result.data) {
          props.GET_CATEGORY({ categories: result.data });
        } else {
          alert("no category to show");
        }
      }
    );
  };

  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginComp} />
        <Route path="/login" component={LoginComp} />
        <Route path="/signup" component={RegisterComp} />
        <Route path="/forget" component={ForgetComp} />
        <Route path="/timeline" component={LoggedinComp} />
      </Switch>

      <Switch>
        <Route path="/timeline" component={TimelineComp}></Route>
        <Route path="/" component={WelcomePage}></Route>
      </Switch>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
