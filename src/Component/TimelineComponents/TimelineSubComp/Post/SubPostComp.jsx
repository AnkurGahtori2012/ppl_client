import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { url } from "../../../../config/url";
let SubPostComp = props => {
  const [postLoaded, setPostLoaded] = useState(false);
  const [postToDisplay, setPostToDisplay] = useState();

  useEffect(() => {
    console.log(props.value, "*********");
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
                <div className="btm_arc">{value.category.categoryName}</div>
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
                    src={url + "/post/" + props.value.image}
                    alt="pet"
                    style={{ height: "200px", width: "200px" }}
                  />
                </Link>
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
                        Comments {value.comments.length}
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        Axios.post(url + "/post/updateLike", {
                          postID: value._id,
                          userID: props.currentUser._id
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
let matchStateToProps = state => {
  return {
    currentUser: state.userReducer.userInfo
  };
};
export default connect(matchStateToProps, null)(SubPostComp);
