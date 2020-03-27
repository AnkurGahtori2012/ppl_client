import React from "react";
import Axios from "axios";

const VerifyComp = ({ match, history }) => {
  let id = match.params[0];
  Axios.post("http://localhost:8082/user/verify", {
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
