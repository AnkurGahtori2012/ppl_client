import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Component/header/Header";
import Footer from "./Component/footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TimelineScreen from "./Screens/TimelineScreen";
import VerifyComp from "./Component/Form/VerifyForm";
import LoginComp from "./Component/Form/LoginForm";
import RegisterComp from "./Component/Form/RegisterForm";
import ForgetComp from "./Component/Form/ForgetForm";
import NotFound from "./Screens/NotFoundScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import ResetComp from "./Component/Form/ResetForm";
import Axios from "axios";
import SinglePost from "./Component/TimelineComponents/TimelineSubComp/Post/SinglePost";
import { setUserInfoAction } from "./actions/userAction";
import { url } from "./config/url";
const App = ({ LOGOUT, LOGIN, loggedIn, setUserInfo }) => {
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let token = JSON.parse(localStorage.getItem("userToken"));
      Axios.post(url + "/user/verifyUserToken", token).then(result => {
        if (result.data.verify) {
          console.log(result.data, "current user is ");
          setUserInfo(result.data);
          LOGIN();
          setIsLoading(false);
        } else {
          LOGOUT();
          setIsLoading(false);
        }
      });
    } else {
      LOGOUT();
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />

          {loggedIn ? (
            <Switch>
              <Redirect from="/(|signup|forget)/" to="/timeline" />
              <Route exact path="/timeline" component={TimelineScreen} />
              <Route path="/timeline/:id" component={SinglePost} />
              <Route path="*" component={NotFound} />
            </Switch>
          ) : (
            <Switch>
              <Redirect from="/timeline" to="/" />
              <Route path="/verify/*" component={VerifyComp} />
              <Route path="/reset/*" component={ResetComp} />
              <Route exact path="/" component={LoginComp} />
              <Route path="/signup" component={RegisterComp} />
              <Route path="/forget" component={ForgetComp} />
              <Route path="*" component={NotFound} />
            </Switch>
          )}

          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn
  };
};

const mapDispatchToProps = dispatch => ({
  setUserInfo: payload => dispatch(setUserInfoAction(payload)),
  LOGIN: () => dispatch({ type: "LOGIN" }),
  LOGOUT: () => dispatch({ type: "LOGOUT" })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
