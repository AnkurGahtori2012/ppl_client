import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import WelcomePage from "../leftComp/WelcomePage";
const mapStateToProps = state => {
  return { loggedIn: state.loginReducer.loggedIn };
};
const mapDispatchToProps = dispatch => {
  return {
    LOGIN: () => dispatch({ type: "LOGIN" })
  };
};
const LoginComp = props => {
  const [background, setBackground] = useState("");
  const [emailStatus, setEmailStatus] = useState("Email-ID");
  const [rememberMe, setRememberMe] = useState("off");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("loginDetail"));
    if (loginData) {
      setUsername(loginData[0]);
      setPassword(loginData[1]);
    }
    if (localStorage.getItem("details")) {
      props.history.push("/timeline");
    }
  }, []);

  const handleChange = e => {
    if (e.target.name === "rememberme") {
      setRememberMe(rememberMe === "on" ? "off" : "on");
    } else {
      setBackground("");
      setEmailStatus("Email-ID");
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(e.target);
    Axios.post("http://192.168.100.189:8082/user/loginUser", formData, {
      headers: { "content-type": "application/JSON" }
    }).then(result => {
      if (result.data) {
        props.LOGIN();
        // alert("user Found");
        let email = result.data.email;
        let password = result.data.password;

        if (rememberMe === "on") {
          localStorage.setItem(
            "loginDetail",
            JSON.stringify([email, password])
          );
        }
        result.data["password"] = "sorry for you";
        localStorage.setItem("details", JSON.stringify(result.data));
        props.history.push("/timeline", result.data);
      } else {
        setBackground("#ffcccb");
        setEmailStatus("Email-ID or Password Incorrect");
      }
    });
    console.log("Form Submittting");
  };
  let location = useLocation().pathname.split("/")[1];
  if (location === "timeline") {
    props.history.push("/");
  }
  return (
    <div className="container">
      <div className="content">
        <WelcomePage />
        <div className="content_rgt">
          <div className="login_sec">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                <li style={{ background: background }}>
                  <span>{emailStatus}</span>
                  <input
                    type="email"
                    required="required"
                    name="email"
                    placeholder="Enter your email"
                    defaultValue={username}
                    onChange={handleChange}
                  />
                </li>
                <li style={{ background: background }}>
                  <span>Password</span>
                  <input
                    required="required"
                    type="password"
                    name="password"
                    defaultValue={password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="rememberme"
                    onChange={handleChange}
                  />
                  Remember Me
                </li>
                <li>
                  <input type="submit" />
                  <Link to="/forget">Forgot Password</Link>
                </li>
              </ul>
            </form>
            <div className="addtnal_acnt">
              I do not have any account yet.
              <Link to="/signup">Create My Account Now !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComp);
