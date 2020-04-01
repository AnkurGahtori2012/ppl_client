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

const mapStateToProps = state => {
  return { categoriesToDisplay: state.categoryReducer.categoriesToDisplay };
};

const AllPost = ({
  uploadFlag,
  handleUpload,
  sortingCriteria,
  categoriesToDisplay
}) => {
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const preSortingCriteria = usePrevious(sortingCriteria);
  const preCategoriesToDisplay = usePrevious(categoriesToDisplay);
  const limit = 1;
  const [skip, increaseSkip] = useState(0);
  useEffect(() => {
    // console.log("i am did update");
    if (sortingCriteria != preSortingCriteria || uploadFlag) {
      // updatePosts();
      handleUpload(false);
    }
  }, [sortingCriteria, uploadFlag]);

  useEffect(() => {
    // if (preCategoriesToDisplay !== categoriesToDisplay) {
    let newPosts = [];
    if (categoriesToDisplay.toLowerCase() === "all") {
      newPosts = [...posts];
    } else {
      for (let i in posts) {
        if (
          posts[i]["category"]["categoryName"].toLowerCase() ===
          categoriesToDisplay.toLowerCase()
        ) {
          newPosts.push(posts[i]);
        }
      }
    }
    console.log("updating current posts");
    setPostsToDisplay(newPosts);
    // }
  }, [categoriesToDisplay, posts]);

  // const sortByLike = arr => {
  //   arr.sort(function(a, b) {
  //     return b.like.length - a.like.length;
  //   });
  // };
  useEffect(() => {
    updatePosts();
  }, [skip]);
  const updatePosts = () => {
    Axios.get(url + "/post/getPost", {
      params: { skip: skip, limit: limit, sort: "date", order: 1 }
    }).then(async result => {
      if (result.data) {
        setPosts([...posts, ...result.data]);
      }

      // if (sortingCriteria === "mostComment") {
      //   newPosts.sort((a, b) => {
      //     return b.comment - a.comment;
      //   });
      //   setPosts(newPosts);
      //   setPostsToDisplay(result.data);
      // }
      // if (sortingCriteria === "oldest") {
      //   setPosts(newPosts);
      //   setPostsToDisplay(result.data);
      // } else if (sortingCriteria === "latest") {
      //   setPosts(newPosts.reverse());
      //   setPostsToDisplay(result.data);
      // } else if (sortingCriteria === "mostClick") {
      //   newPosts = sortByLike(newPosts);
      //   setPosts(newPosts);
      //   setPostsToDisplay(result.data);
      // }
    });
  };

  return (
    <>
      {postsToDisplay.map(value => (
        <div key={value._id}>
          {/* passing detail to each post  */}
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
    </>
  );
};
export default connect(mapStateToProps, null)(AllPost);
