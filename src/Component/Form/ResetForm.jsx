import React from "react";
import WelcomePage from "./WelcomePage";
import Axios from "axios";
import { url } from "../../config/url";
const ResetComp = ({ history, match }) => {
  let handleSubmit = e => {
    e.preventDefault();

    let data = new FormData(e.target);
    data.append("userID", match.params[0]);
    Axios.post(url + "/user/updatePassword", data).then(reseult => {
      history.push("/");
    });
  };
  return (
    <>
      <div className="container">
        <div className="content">
          <WelcomePage />
          <div className="register_sec">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <span>Enter New Password</span>
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter your new password"
                  />
                </li>
                <li>
                  <input type="submit" defaultValue="Submit" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetComp;
