import React from "react";

import SideNavBar from "../Component/TimelineComponents/SideNavBarComponents/SideNavBar";
import TimelineComp from "../Component/TimelineComponents/TimelineSubComp/TimelineComp";
import { useState } from "react";

const TimelineScreen = () => {
  const [refereshUpload, setRefereshUpload] = useState(false);
  const changeOnUploading = value => {
    setRefereshUpload(value); //this will send new props to post and new post will be loaded in webpage
  };
  return (
    <div className="container">
      <div className="content">
        <SideNavBar handleUpload={changeOnUploading} />
        <TimelineComp
          handleUpload={changeOnUploading}
          uploadFlag={refereshUpload}
        />
      </div>
    </div>
  );
};

export default TimelineScreen;
