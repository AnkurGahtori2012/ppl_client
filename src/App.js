import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Component/header/Header";
import Footer from "./Component/footer/Footer";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TimelineScreen from "./Screens/TimelineScreenComponents/TimelineScreen";
import VerifyComp from "./Screens/LoginAndSignupScreenComponents/VerifyComp";
import LoginComp from "./Screens/LoginAndSignupScreenComponents/LoginComp";
import RegisterComp from "./Screens/LoginAndSignupScreenComponents/RegisterComp";
import ForgetComp from "./Screens/LoginAndSignupScreenComponents/ForgetComp";
import NotFound from "./Screens/NotFoundScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import ResetComp from "./Screens/LoginAndSignupScreenComponents/ResetComp";
let LOGIN = () => {
  return { type: "LOGIN" };
};
let LOGOUT = () => {
  return { type: "LOGOUT" };
};

const mapStateToProps = state => {
  return { loggedIn: state.loginReducer.loggedIn };
};

const App = props => {
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("details")) {
      props.LOGIN();
    } else {
      props.LOGOUT();
    }
    setIsLoading(false);
  }, []);
  let location = useLocation();
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />

          {props.loggedIn ? (
            <Switch>
              <Redirect from="/(|signup|forget)/" to="/timeline" />
              <Route path="/timeline" component={TimelineScreen} />
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

export default connect(mapStateToProps, { LOGIN, LOGOUT })(App);
