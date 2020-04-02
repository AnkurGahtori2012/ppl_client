import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import SubPostComp from "./SubPostComp";
import { connect } from "react-redux";
import { url } from "../../../../config/url";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const AllPost = ({
  uploadFlag,
  handleUpload,
  sortingCriteria,
  categoriesToDisplay
}) => {
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const preSortingCriteria = usePrevious(sortingCriteria);
  const preCategoriesToDisplay = usePrevious(categoriesToDisplay);
  const limit = 2;
  const [skip, increaseSkip] = useState(0);
  useEffect(() => {
    if (sortingCriteria !== preSortingCriteria) {
      console.log(sortingCriteria, "changing criteria", preSortingCriteria);
      if (skip !== 0) increaseSkip(0);
      else updatePosts();
    } else if (uploadFlag) {
      handleUpload(false);
      alert("you just added new post");
    } else if (
      preCategoriesToDisplay.categoryName !== categoriesToDisplay.categoryName
    ) {
      sortingCriteria = "latest";
      if (skip !== 0) increaseSkip(0);
      else updatePosts();
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
      order = 1;
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
    }).then(async result => {
      if (result.data) {
        if (skip !== 0) setPostsToDisplay([...postsToDisplay, ...result.data]);
        else {
          setPostsToDisplay(result.data);
        }
      }
    });
  };

  return (
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
          e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
          increaseSkip(limit + skip);
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
              increaseSkip(limit + skip);
            }}
          >
            Load More...
          </button>
        </li>
      </ul>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    categoriesToDisplay: state.categoryReducer.categories,
    categoriesToDisplay: state.categoryReducer.categoriesToDisplay
  };
};
export default connect(mapStateToProps, null)(AllPost);
