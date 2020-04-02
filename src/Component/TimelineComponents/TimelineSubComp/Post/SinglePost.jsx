import React, { useState, useEffect } from "react";
import Axios from "axios";
import Moment from "react-moment";
import LoadingScreen from "../../../../Screens/LoadingScreen";
import { connect } from "react-redux";
import { url } from "../../../../config/url";
const SinglePost = ({ currentUser, location, history }) => {
  let loadingPostDone = useState(false);
  const [postToDisplay, setPostToDisplay] = useState({
    like: [],
    dislike: [],
    category: { category: "" }
  });
  const [comments, setComments] = useState([
    { comment: "", commentedBy: { username: "" } }
  ]);
  const cancelCourse = () => {
    document.getElementById("create-course-form").reset();
  };
  const handleCommentSubmit = e => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    formdata.append("commentedBy", currentUser._id);
    formdata.append("postID", location.pathname.split("timeline/")[1]);
    Axios.post(url + "/post/addComment", formdata).then(result => {
      // newcomments.push(result.data.comments);

      setComments([
        ...comments,
        result.data.comments[result.data.comments.length - 1]
      ]);
      cancelCourse();
    });
  };
  let getPostByID = async id => {
    let result = await Axios.post(url + "/post/getPostByID", id);
    return result;
  };
  useEffect(() => {
    let id = { _id: location.pathname.split("timeline/")[1] };
    getPostByID(id).then(result => {
      if (result.data) {
        setPostToDisplay(result.data);

        setComments(result.data.comments);
      } else {
        history.push("/error");
      }
    });
  }, []);
  let value = postToDisplay;
  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content_lft">
            {loadingPostDone ? (
              <>
                <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">{value.title}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">
                        {value.category.categoryName}
                      </div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft">
                        <img src="/images/img_6.png" />
                        {value.username}
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
                    <div className="div_image">
                      <img src={url + "/post/" + value.image} alt="pet" />
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
                            <span className="btn_icon">
                              <img src="/images/icon_004.png" alt="share" />
                            </span>
                            {comments.length}
                          </li>
                          <li
                            onClick={() => {
                              Axios.post(url + "/post/updateLike", {
                                postID: value._id,
                                userID: currentUser._id
                              }).then(result => {
                                if (result.data) {
                                  if (
                                    result.data.like.length !=
                                    postToDisplay.like.length
                                  ) {
                                    setPostToDisplay(result.data);
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
                          <div
                            className="like_count"
                            style={{ marginRight: "10px" }}
                          >
                            <span className="lft_cnt" />
                            <span className="mid_cnt">{value.like.length}</span>
                            <span className="rit_cnt" />
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contnt_3">
                  <form onSubmit={handleCommentSubmit} id="create-course-form">
                    <ul>
                      {/* this is comment array */}
                      {comments.map((result, id) => (
                        <li key={id}>
                          <div>
                            <div className="list_image">
                              <div className="image_sec">
                                <img src="/images/post_img.png" />
                              </div>
                              <div className="image_name">
                                {result.commentedBy.username}
                              </div>
                            </div>
                            <div className="list_info">{result.comment}</div>
                          </div>
                        </li>
                      ))}

                      {/* this is comment array */}
                    </ul>
                    <ul>
                      <div className="cmnt_div">
                        <input
                          required="required"
                          name="comment"
                          type="text"
                          placeholder="Add a Comment"
                          className="cmnt_bx"
                        />
                        <input
                          type="submit"
                          className="sub_bttn"
                          defaultValue="Submit Comment"
                        />
                      </div>
                    </ul>
                  </form>
                </div>
              </>
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const matchStateToProps = state => {
  return { currentUser: state.userReducer.userInfo };
};
export default connect(matchStateToProps, null)(SinglePost);
