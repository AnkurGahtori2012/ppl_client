import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import SubPostComp from "./SubPostComp";
import { connect } from "react-redux";

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

const AllPost = props => {
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const { sortingCriteria, categoriesToDisplay } = props;
  const preSortingCriteria = usePrevious(sortingCriteria);
  const preCategoriesToDisplay = usePrevious(categoriesToDisplay);
  useEffect(() => {
    // console.log("i am did update");
    if (sortingCriteria != preSortingCriteria || props.uploadFlag) {
      updatePosts();
      props.handleUpload(false);
    }
  }, [sortingCriteria, props.uploadFlag]);

  useEffect(() => {
    //console.log("this is update for category chaneg");
    if (preCategoriesToDisplay !== categoriesToDisplay) {
      let newPosts = [];
      if (props.categoriesToDisplay.toLowerCase() === "all") {
        newPosts = [...posts];
      } else {
        //Filtering Categories
        for (let i in posts) {
          if (
            posts[i]["category"].toLowerCase() ===
            props.categoriesToDisplay.toLowerCase()
          ) {
            newPosts.push(posts[i]);
          }
        }
      }
      setPostsToDisplay(newPosts);
    }
  }, [categoriesToDisplay]);

  const sortByLike = arr => {
    arr.sort(function(a, b) {
      return b.like.length - a.like.length;
    });
  };

  const updatePosts = () => {
    Axios.get("http://localhost:8082/post/getPost").then(async result => {
      let newPosts = result.data;
      for (let i in newPosts) {
        let data = { postID: newPosts[i]["_id"] };
        await Axios.post(
          "http://localhost:8082/comment/getCommentByID",
          data
        ).then(result => {
          let count = 0;
          let comments = result.data;
          for (let j in comments) {
            if (comments[j].comment) {
              count++;
            }
          }
          newPosts[i]["comment"] = count;
        });
      }
      if (props.sortingCriteria === "mostComment") {
        newPosts.sort((a, b) => {
          return b.comment - a.comment;
        });
        setPosts(newPosts);
        setPostsToDisplay(result.data);
      }
      if (props.sortingCriteria === "oldest") {
        setPosts(newPosts);
        setPostsToDisplay(result.data);
      } else if (props.sortingCriteria === "latest") {
        setPosts(newPosts.reverse());
        setPostsToDisplay(result.data);
      } else if (props.sortingCriteria === "mostClick") {
        newPosts = sortByLike(newPosts);
        setPosts(newPosts);
        setPostsToDisplay(result.data);
      } else if (props.sortingCriteria === "mostCommented") {
      }
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
    </>
  );
};
export default connect(mapStateToProps, null)(AllPost);
