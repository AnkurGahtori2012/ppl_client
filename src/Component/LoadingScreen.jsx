import React, { useEffect } from "react";
const LoadingScreen = () => {
  let style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    size: "3em",
    backgroundColor: "orange",
    height: "100vh",
    width: "100vw"
  };
  return (
    <div style={style}>
      <h1>Loading Page >>>>></h1>
    </div>
  );
};
export default LoadingScreen;
