import React, { useState } from "react";
import Profile from "./Profile";
import SortingComp from "./SortingComp";
import AllPost from "./PostComp/AllPost";
const TimelineComp = ({ handleUpload, uploadFlag }) => {
  const [sortingCriteria, setSortingCriteria] = useState("latest");

  const changeSortingCriteria = value => {
    setSortingCriteria(value);
  };

  return (
    <div className="content_lft">
      <Profile />
      <SortingComp changeSortingCriteria={changeSortingCriteria} />
      <AllPost
        sortingCriteria={sortingCriteria}
        handleUpload={handleUpload}
        uploadFlag={uploadFlag}
      />
    </div>
  );
};

export default TimelineComp;
