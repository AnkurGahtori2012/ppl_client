import React, { useState } from "react";
import Profile from "./TimelineSubComp/Profile";
import Post from "./TimelineSubComp/Post";
import UploadPostComp from "./TimelineSubComp/UploadPostComp";
import { Switch, Route, Redirect } from "react-router-dom";
import SortingComp from "./TimelineSubComp/SortingComp";
const TimelineComp = props => {
  const [upload, setUpload] = useState(false);
  const [sortingCriteria, setSortingCriteria] = useState("latest");

  const changeSortingCriteria = value => {
    setSortingCriteria(value);
  };
  const changeOnUploading = value => {
    setUpload(value); //this will send new props to post and new post will be loaded in webpage
    props.history.push("/timeline");
    // alert(props.history);
  };
  if (localStorage.getItem("details")) {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/timeline"
            render={p => (
              <SortingComp
                {...p}
                changeSortingCriteria={changeSortingCriteria}
              />
            )}
          ></Route>

          <Route
            path="/timeline/upload"
            render={p => (
              <UploadPostComp
                {...p}
                categories={props.categories}
                handleUpload={changeOnUploading}
                categories={props.categories}
              />
            )}
          ></Route>
          <Route
            exact
            path="/timeline/addCategory"
            render={p => (
              <SortingComp
                {...p}
                changeSortingCriteria={changeSortingCriteria}
              />
            )}
          ></Route>
          <Route exact path="/timeline/profile" component={Profile}></Route>
        </Switch>
        <Post
          sortingCriteria={sortingCriteria}
          handleUpload={changeOnUploading}
          uploadFlag={upload}
        />
      </>
    );
  } else {
    return (
      <>
        <Redirect to="/" />
      </>
    );
  }
};

export default TimelineComp;
