import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Component/header/Header";
import Footer from "./Component/footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TimelineScreen from "./Screens/TimelineScreen";
import VerifyComp from "./Component/Form/VerifyForm";
import RegisterComp from "./Component/Form/RegisterForm";
import ForgetComp from "./Component/Form/ForgetForm";
import NotFound from "./Screens/NotFoundScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import ResetComp from "./Component/Form/ResetForm";
import Axios from "axios";
import SinglePost from "./Component/TimelineComponents/TimelineSubComp/Post/SinglePost";
import { setUserInfo } from "./actions/userAction";
import { setCategories } from "./actions/categoryAction";

import { url } from "./config/url";
import LoginForm from "./Component/Form/LoginForm";
const App = ({ setUserInfo, setCategories }) => {
  let [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let token = JSON.parse(localStorage.getItem("userToken"));
      Axios.post(url + "/user/verifyUserToken", token).then(result => {
        if (result.data.verify) {
          setUserInfo(result.data);
          setCategories();
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

          {isLoggedIn ? (
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
              <Route
                exact
                path="/"
                render={() => <LoginForm setIsLoggedIn={setIsLoggedIn} />}
              />
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

const mapDispatchToProps = dispatch => ({
  setUserInfo: payload => dispatch(setUserInfo(payload)),
  setCategories: () => {
    dispatch(setCategories());
  }
});

export default connect(null, mapDispatchToProps)(App);
