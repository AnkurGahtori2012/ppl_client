import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import { url } from "../../config/url";

const RegisterComp = ({ history }) => {
  const [agree, setAgree] = useState("off");
  const [background, setbackground] = useState("");
  const [backgroundCheckBox, setbackgroundCheckBox] = useState("");
  const [emailStatus, setEmailStatus] = useState("email");
  const [registrationDone, setRegistrationDone] = useState(false);
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
      Axios.post(url + "/user/insertUser", formData, {
        headers: { "content-type": "application/JSON" }
      }).then(data => {
        if (data.data) {
          setRegistrationDone(true);
          setTimeout(() => {
            history.push("/");
          }, 3000);
        } else {
          setbackground("#ffcccb");
          setEmailStatus("Email already Exist");
        }
      });
      // console.log("Form Submittting");
    }
  };
  return (
    <div className="container">
      <div className="content">
        <WelcomePage />
        {!registrationDone ? (
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
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input
                      required="required"
                      type="text"
                      name="lastName"
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
        ) : (
          <div>
            <h1>Email sent for verification....</h1>
            <h2>Redirecting to login page>>>></h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default RegisterComp;
