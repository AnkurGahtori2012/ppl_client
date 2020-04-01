import React from "react";
import Axios from "axios";
import { url } from "../../config/url";

const VerifyComp = ({ match, history }) => {
  let id = match.params[0];
  Axios.post(url + "/user/verify", {
    _id: id
  }).then(result => {
    if (result.data) {
      history.push("/");
    } else {
      history.push("/error");
    }
  });

  return <h1>You are now verified Redirecting to login page</h1>;
};
export default VerifyComp;
