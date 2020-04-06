import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import SubPostComp from "./SubPostComp";
import { connect } from "react-redux";
import { url } from "../../../../config/url";
import {
  resetPostsToDisplay,
  appendPostsToDisplay
} from "../../../../actions/postAction";
const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const AllPost = ({
  uploadFlag,
  handleUpload,
  sortingCriteria,
  categoriesToDisplay,
  postsToDisplay,
  resetPostsToDisplay,
  appendPostsToDisplay
}) => {
  const mounted = useRef();
  const preSortingCriteria = usePrevious(sortingCriteria);
  const preCategoriesToDisplay = usePrevious(categoriesToDisplay);
  const limit = 2;
  let [skip, setSkip] = useState(0);
  useEffect(() => {
    if (!mounted.current) {
      console.log("i will work once only");
      if (postsToDisplay.length === 0) {
        mounted.current = true;
        // updatePosts();
      } else {
        setSkip(postsToDisplay.length);
      }
    } else {
      if (uploadFlag) {
        handleUpload(false);
        alert("you just added new post");
      }
      if (
        preCategoriesToDisplay.categoryName !== categoriesToDisplay.categoryName
      ) {
        sortingCriteria = "latest";
      }
      setCount(0);

      if (skip === 0) {
        updatePosts();
      } else {
        setSkip(0);
      }
    }
  }, [sortingCriteria, uploadFlag, categoriesToDisplay]);
  useEffect(() => {
    updatePosts();
  }, [skip]);
  const updatePosts = () => {
    let sort;
    let order;

    if (sortingCriteria === "mostComment") {
      sort = "comments";
      order = -1;
    } else if (sortingCriteria === "oldest") {
      sort = "date";
      order = 1;
    } else if (sortingCriteria === "latest") {
      sort = "date";
      order = -1;
    } else if (sortingCriteria === "mostClick") {
      sort = "like";
      order = -1;
    }
    let category;
    if (categoriesToDisplay.categoryName === "ALL") {
      category = "Fake_ID";
    } else {
      category = categoriesToDisplay._id;
    }
    Axios.get(url + "/post/getPost", {
      params: {
        skip: skip,
        limit: limit,
        sort: sort,
        order: order,
        category: category
      }
    }).then(result => {
      if (result.data) {
        if (
          preCategoriesToDisplay !== categoriesToDisplay ||
          preSortingCriteria !== sortingCriteria ||
          skip === 0
        ) {
          console.log("resetting");
          resetPostsToDisplay(result.data);
        } else {
          console.log("appending");
          appendPostsToDisplay(result.data);
        }
      }
      else{

      }
    });
  };
  const [count, setCount] = useState(0);
  return (
    <>
      
      <div
        style={{
          paddingRight: "20px",
          height: "100vh",
          overflowY: "scroll",
          paddingBottom: "102vh"
        }}
        className="scrollable"
        onScroll={e => {
          const bottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;
          if (bottom) {
            console.log("function called : ", count);
            setCount(count + 1);
            setSkip(skip + limit);
          }
        }}
      >
        {postsToDisplay.map(value => (
          <div key={value._id}>
            <SubPostComp value={value} />
          </div>
        ))}
        <ul>
          <li>
            <button
              onClick={() => {
                setSkip(skip + limit);
              }}
            >
              Load More...
            </button>
          </li>
        </ul>
      </div>
      <h1>
        limit:{limit} skip:{skip} sorting: {sortingCriteria}{" "}
        categoriesToDisplay:{categoriesToDisplay.categoryName}
      </h1>
    </>
  );
};
const mapDispatchToProps = dispatch => ({
  resetPostsToDisplay: payload => dispatch(resetPostsToDisplay(payload)),
  appendPostsToDisplay: payload => dispatch(appendPostsToDisplay(payload))
});
const mapStateToProps = state => {
  return {
    categoriesToDisplay: state.categoryReducer.categories,
    categoriesToDisplay: state.categoryReducer.categoriesToDisplay,
    postsToDisplay: state.postReducer.postsToDisplay
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllPost);
