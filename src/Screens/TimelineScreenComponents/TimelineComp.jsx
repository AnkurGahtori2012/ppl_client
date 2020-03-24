import React, { useState } from "react";
import Profile from "./TimelineSubComp/Profile";
import UploadPostComp from "./TimelineSubComp/UploadPostComp";
import { Switch, Route, Redirect } from "react-router-dom";
import SortingComp from "./TimelineSubComp/SortingComp";
import SinglePost from "./TimelineSubComp/PostComp/SinglePost";
import AllPost from "./TimelineSubComp/PostComp/AllPost";
const TimelineComp = props => {
  const [upload, setUpload] = useState(false);
  const [sortingCriteria, setSortingCriteria] = useState("latest");

  const changeSortingCriteria = value => {
    setSortingCriteria(value);
  };
  const changeOnUploading = value => {
    setUpload(value); //this will send new props to post and new post will be loaded in webpage
  };
  return (
    <div className="content_lft">
      <Switch>
        <Route
          exact
          path="/timeline(|/addCategory)/"
          render={p => (
            <SortingComp {...p} changeSortingCriteria={changeSortingCriteria} />
          )}
        ></Route>
        <Route
          path="/timeline/upload"
          render={p => (
            <UploadPostComp {...p} handleUpload={changeOnUploading} />
          )}
        ></Route>
        <Route exact path="/timeline/profile" component={Profile}></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/timeline(/addCategory|/upload|/profile||)/"
          render={p => (
            <AllPost
              {...p}
              sortingCriteria={sortingCriteria}
              handleUpload={changeOnUploading}
              uploadFlag={upload}
            />
          )}
        />
        <Route path="/timeline/:id" component={SinglePost} />
      </Switch>
    </div>
  );
};

export default TimelineComp;
