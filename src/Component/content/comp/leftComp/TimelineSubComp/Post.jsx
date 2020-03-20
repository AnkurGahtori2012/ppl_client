import React from "react";
import { Route, Switch } from "react-router-dom";
import AllPost from "./PostComp/AllPost";
import SinglePost from "./PostComp/SinglePost";
function Post(props) {
  return (
    <Switch>
      <Route
        path="/timeline/(addCategory|upload|profile)/"
        render={p => (
          <AllPost
            {...p}
            sortingCriteria={props.sortingCriteria}
            handleUpload={props.handleUpload}
            uploadFlag={props.uploadFlag}
          />
        )}
      />

      <Route path="/timeline/:id" component={SinglePost} />
      <Route
        path="/timeline"
        render={p => (
          <AllPost
            {...p}
            sortingCriteria={props.sortingCriteria}
            handleUpload={props.handleUpload}
            uploadFlag={props.uploadFlag}
          />
        )}
      />
    </Switch>
  );
}
export default Post;
