import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

let SubPostComp = props => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [postToDisplay, setPostToDisplay] = useState();

  useEffect(() => {
    setPostToDisplay(props.value);
    setPostLoaded(true);
  }, []);
  //component did Mount
  let value = postToDisplay;
  return (
    <>
      {postLoaded ? (
        <div>
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">{value.title}</div>
              <div className="btm_rgt">
                <div className="btm_arc">{value.category.category}</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="/images/img_6.png" alt="" />
                  {value.postedBy.username}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">
                    <Moment format="D MMM YYYY" withTitle>
                      {value.time}
                    </Moment>
                  </span>
                  <span className="span_time">
                    {" "}
                    <Moment format="hh : mm a" withTitle>
                      {value.time}
                    </Moment>
                  </span>
                </div>
              </div>
              <div
                className="div_image"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to={"/timeline/" + value._id}>
                  <img
                    src={"http://localhost:8082/post/" + props.value.image}
                    alt="pet"
                    style={{ height: "200px", width: "200px" }}
                  />
                </Link>
                {/* <img src={"/post/" + value.image} alt="pet" /> */}
              </div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul>
                    <li>
                      <a href="#">
                        <span className="btn_icon">
                          <img src="/images/icon_001.png" alt="share" />
                        </span>
                        Share
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="btn_icon">
                          <img src="/images/icon_002.png" alt="share" />
                        </span>
                        Flag
                      </a>
                    </li>
                    <li>
                      <Link to={"/timeline/" + value._id}>
                        <span className="btn_icon">
                          <img src="/images/icon_004.png" alt="share" />
                        </span>
                        Comments {value.comment}
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        let data = JSON.parse(localStorage.getItem("details"));

                        Axios.post("http://localhost:8082/post/updateLike", {
                          postID: value._id,
                          userID: data._id
                        }).then(result => {
                          if (result.data) {
                            if (
                              result.data.like.length !=
                              postToDisplay.like.length
                            ) {
                              setPostToDisplay({
                                ...value,
                                like: result.data.like
                              });
                              console.log("New data is", postToDisplay);
                            }
                          }
                        });
                      }}
                    >
                      <span className="btn_icon">
                        <img src="/images/icon_003.png" alt="share" />
                      </span>
                      Likes
                    </li>
                    <div className="like_count" style={{ marginRight: "10px" }}>
                      <span className="lft_cnt" />
                      <span className="mid_cnt">{value.like.length}</span>
                      <span className="rit_cnt" />
                    </div>
                    {/* <li
                      onClick={() => {
                        let data = JSON.parse(localStorage.getItem("details"));
                        console.log("clicking unlike inside Axios");
                        Axios.post("http://localhost:8082/post/updateDislike", {
                          postID: value._id,
                          userID: data.userID
                        }).then(result => {
                          if (result.data) {
                            if (
                              result.data.dislike.length !=
                              this.state.postToDisplay.dislike.length
                            ) {
                              this.setState({ postToDisplay: result.data });
                            }
                          }
                        });
                      }}
                    >
                      <span className="btn_icon">
                        <img src="/images/icon_003.png" alt="share" />
                      </span>
                      Unlike
                    </li> */}
                    {/* <div className="like_count">
                      <span className="lft_cnt" />
                      <span className="mid_cnt">{value.dislike.length}</span>
                      <span className="rit_cnt" />
                    </div> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
export default SubPostComp;
