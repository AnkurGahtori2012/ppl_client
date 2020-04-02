import React from "react";

const SortingComp = ({ changeSortingCriteria }) => {
  return (
    <div>
      <div className="post_div">
        <div className="post_list">
          <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
            <li
              onClick={e => {
                changeSortingCriteria(e.target.id);
              }}
              id="latest"
            >
              <span className="list_img">
                <img src="/images/img_1.png" />
              </span>
              Latest First
            </li>
            <li
              onClick={e => {
                changeSortingCriteria(e.target.id);
              }}
              id="oldest"
            >
              <span className="list_img">
                <img src="/images/img_2.png" />
              </span>
              Oldest First
            </li>

            <li
              onClick={e => {
                changeSortingCriteria(e.target.id);
              }}
              id="mostClick"
            >
              <span className="list_img">
                <img src="/images/img_4.png" />
              </span>
              Most Clicks
            </li>
            <li
              onClick={e => {
                changeSortingCriteria(e.target.id);
              }}
              id="mostComment"
            >
              <span className="list_img">
                <img src="/images/img_5.png" />
              </span>
              Most Commented
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SortingComp;
