import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import WelcomePage from "../leftComp/WelcomePage";

const RegisterComp = props => {
  const [agree, setAgree] = useState("off");
  const [background, setbackground] = useState("");
  const [backgroundCheckBox, setbackgroundCheckBox] = useState("");
  const [emailStatus, setEmailStatus] = useState("email");

  useEffect(() => {
    if (localStorage.getItem("details")) {
      props.history.push("/timeline");
    }
  }, []);
  const handleEmailChange = () => {
    if (background === "#ffcccb") {
      setbackground("");
      setEmailStatus("Email");
    }
  };

  const handleCheckbox = e => {
    if (agree === "on") {
      setAgree("off");
      setbackgroundCheckBox("#ffcccb");
    } else {
      setAgree("on");
      setbackgroundCheckBox("");
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (agree === "off") {
      setbackgroundCheckBox("#ffcccb");
      return;
    } else {
      let formData = new FormData(e.target);
      Axios.post("http://localhost:8082/user/insertUser", formData, {
        headers: { "content-type": "application/JSON" }
      }).then(data => {
        if (data.data) {
          props.history.push("/");
        } else {
          setbackground("#ffcccb");
          setEmailStatus("Email already Exist");
        }
      });
      console.log("Form Submittting");
    }
  };
  return (
    <div className="container">
      <div className="content">
        <WelcomePage />
        <div className="content_rgt">
          <div className="register_sec">
            <h1>Create An Account</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <span>Username</span>
                  <input
                    required="required"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                </li>
                <li>
                  <span>Password</span>
                  <input
                    required="required"
                    type="password"
                    minLength="8"
                    name="password"
                    placeholder="Enter your password"
                  ></input>
                </li>
                <li style={{ background: background }}>
                  <span>{emailStatus}</span>
                  <input
                    onChange={handleEmailChange}
                    type="email"
                    name="email"
                    required="required"
                    placeholder="Enter your email"
                  />
                </li>
                <li>
                  <span>First Name</span>
                  <input
                    required="required"
                    type="text"
                    name="fname"
                    placeholder="Enter your first name"
                  />
                </li>
                <li>
                  <span>Last Name</span>
                  <input
                    required="required"
                    type="text"
                    name="lname"
                    placeholder="Enter your last name"
                  />
                </li>

                <li style={{ background: backgroundCheckBox }}>
                  <input
                    type="checkbox"
                    name="select"
                    onChange={handleCheckbox}
                  />
                  I agree to Term &amp; Conditions
                </li>
                <li>
                  <input type="submit" />
                </li>
              </ul>
            </form>
            <div className="addtnal_acnt">
              I already have an account.
              <Link to="/">Login My Account !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterComp;
