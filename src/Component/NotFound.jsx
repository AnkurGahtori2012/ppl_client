import React from "react";
const NotFound = () => (
  <div className="container">
    <div className="content">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>This page isn't available</h1>
        <h4>
          The link you followed may be broken, or the page may have been
          removed.
        </h4>
        <img
          src="https://us.123rf.com/450wm/likozor/likozor1802/likozor180200015/95275900--upset-orange-cat-tik-lies-in-tears-404-error-oops-page-not-found-vector-illustration-cute-pet-chara.jpg?ver=6"
          style={{
            width: 400,
            height: 400,
            display: "block",
            margin: "auto",
            position: "relative"
          }}
        />
      </div>
    </div>
  </div>
);
export default NotFound;
