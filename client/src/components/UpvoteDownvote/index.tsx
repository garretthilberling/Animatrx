import React, { useEffect, useState } from "react";
import authService from "../../utils/auth";
import { getProfile } from "../../utils/userRoutes";
import { useParams } from "react-router-dom";
import { voteQuery } from "../../utils/types";
import { getReview, upvoteReview, downvoteReview } from "../../utils/reviewRoutes";
import AuthService from "../../utils/auth";

const UpvoteDownvote = ({ review }: any) => {
  const [thumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [thumbsDownSelected, setThumbsDownSelected] = useState(false);
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
    setThumbsUpSelected(prev => !prev);
  };

  const handleThumbsDownSelect = () => {
    downvoteReview(url, user, review._id, animeId, setError, auth);
    setThumbsDownSelected(prev => !prev);
  };

  useEffect(() => {
    getReview(url, review._id, animeId, setLoading, setError, setData);
    console.log(data);
    if (data) {
      if (data.upvotes.includes(user.userId)) {
        setThumbsUpSelected(true);
      }
      if (data.downvotes.includes(user.userId)) {
        setThumbsDownSelected(true);
      }
    }
  }, [loading, thumbsUpSelected, thumbsDownSelected]);

  return (
    <div>
      <button onClick={handleThumbsUpSelect}>
        {review.upvotes.length} <i className={`fa-regular fa-thumbs-up ${thumbsUpSelected && 'thumbs-up'}`}></i>
      </button>
      <button onClick={handleThumbsDownSelect}>
        {review.downvotes.length} <i className={`fa-regular fa-thumbs-down ${thumbsDownSelected && 'thumbs-down'}`}></i>
      </button>
    </div>
  );
};

export default UpvoteDownvote;
