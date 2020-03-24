import React from "react";
import WelcomePage from "../leftComp/WelcomePage";
import Axios from "axios";
const ResetComp = props => {
  let handleSubmit = e => {
    e.preventDefault();

    let data = new FormData(e.target);
    data.append("userID", props.match.params[0]);
    Axios.post("http://localhost:8082/user/updatePassword", data).then(
      reseult => {
        props.history.push("/");
      }
    );
  };
  return (
    <>
      <div className="container">
        <div className="content">
          <WelcomePage />
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Reset Password</h1>
              <form onSubmit={handleSubmit}>
                <ul>
                  <li>
                    <span>Enter New Password</span>
                    <input type="password" name="password" />
                  </li>
                  <li>
                    <input type="submit" />
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetComp;
