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
  const [verifyErrorDisplay, setVerifyErrorDisplay] = useState("none");
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
      setEmailStatus("");
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData(e.target);
    Axios.post("http://localhost:8082/user/loginUser", formData, {
      headers: { "content-type": "application/JSON" }
    }).then(result => {
      if (result.data) {
        if (result.data.verify) {
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
          setVerifyErrorDisplay("block");
        }
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
                <li>
                  <span>Email-ID</span>
                  <span style={{ background: background }}>
                    <input
                      type="email"
                      required="required"
                      name="email"
                      placeholder="Enter your email"
                      defaultValue={username}
                      onChange={handleChange}
                    />
                    {emailStatus}
                  </span>
                </li>

                <li>
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
            <h1
              style={{
                display: verifyErrorDisplay
              }}
            >
              This Account is Not Yet Verified.
            </h1>
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
