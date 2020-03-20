import React, { useEffect } from "react";
import "./App.css";
import Header from "./Component/header/Header";
import Footer from "./Component/footer/Footer";
import Content from "./Component/content/Content";
import { connect } from "react-redux";
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
  useEffect(() => {
    if (localStorage.getItem("details")) {
      props.LOGIN();
    } else {
      props.LOGOUT();
    }
  }, [props]);

  return (
    <div>
      <Header />

      <Content />
      
      <Footer />
    </div>
  );
};


export default connect(mapStateToProps, { LOGIN, LOGOUT })(App);
