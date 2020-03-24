import React from "react";
import Axios from "axios";

const VerifyComp = props => {
  let id = props.match.params[0];
  Axios.post("http://localhost:8082/user/verify", {
    _id: id
  }).then(result => {
    if (result.data) {
      props.history.push("/");
    } else {
      props.history.push("/error");
    }
  });

  return <h1>You are now verified Redirecting to login page</h1>;
};
export default VerifyComp;
