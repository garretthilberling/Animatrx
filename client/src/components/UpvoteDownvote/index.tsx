import React, { useEffect, useState } from "react";
import authService from "../../utils/auth";
import { getProfile } from "../../utils/userRoutes";
import { useParams } from "react-router-dom";
import { voteQuery } from "../../utils/types";
import { getReview, upvoteReview, downvoteReview } from "../../utils/reviewRoutes";
import AuthService from "../../utils/auth";

const UpvoteDownvote = ({ review }: any) => {
  const [thumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [upvotes, setUpvotes] = useState(review.upvotes.length);
  const [thumbsDownSelected, setThumbsDownSelected] = useState(false);
  const [downvotes, setDownvotes] = useState(review.downvotes.length);
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user: voteQuery = {
    userId: authService.getProfile().data._id,
  };
  const authToken = authService.getToken();
  const animeId = useParams().animeId;
  const auth = AuthService.getToken();
  const url = window.location.host;

  const handleThumbsUpSelect = () => {
    upvoteReview(url, user, review._id, animeId, setError, auth);
    if(!thumbsUpSelected) {
      setUpvotes((prev:number) => prev += 1);
    } else {
      if(upvotes > 0) setUpvotes((prev:number) => prev -= 1);
    }
    if(thumbsDownSelected) {
      if(downvotes > 0) setDownvotes((prev:number) => prev -= 1);
      setThumbsDownSelected(prev => !prev);
    }
    setThumbsUpSelected(prev => !prev);
  };

  const handleThumbsDownSelect = () => {
    downvoteReview(url, user, review._id, animeId, setError, auth);
    if(!thumbsDownSelected) {
      setDownvotes((prev:number) => prev += 1);
    } else {
      if(downvotes > 0) setDownvotes((prev:number) => prev -= 1);
    }
    if(thumbsUpSelected) {
      if(upvotes > 0) setUpvotes((prev:number) => prev -= 1);
      setThumbsUpSelected(prev => !prev);
    }
    setThumbsDownSelected(prev => !prev);
  };

  useEffect(() => {
    getReview(url, review._id, animeId, setLoading, setError, setData, setThumbsUpSelected, setThumbsDownSelected, user);
  }, [loading, thumbsUpSelected, thumbsDownSelected, upvotes, downvotes]);

  return (
    <div className="upvote-downvote-container">
      <button onClick={handleThumbsUpSelect}>
        {upvotes} <i className={`fa-regular fa-thumbs-up ${thumbsUpSelected ? 'thumbs-up' : 'thumbs-up-down-unselected'}`}></i>
      </button>
      <button onClick={handleThumbsDownSelect}>
        {downvotes} <i className={`fa-regular fa-thumbs-down ${thumbsDownSelected ? 'thumbs-down' : 'thumbs-up-down-unselected'}`}></i>
      </button>
    </div>
  );
};

export default UpvoteDownvote;
