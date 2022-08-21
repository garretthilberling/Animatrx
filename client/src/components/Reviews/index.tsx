import React, {useState, useEffect} from "react";
import { getReviews } from "../../utils/reviewRoutes";
import { Link } from "react-router-dom";
import UpvoteDownvote from "../UpvoteDownvote";

const Reviews = ({ animeId, setReviews }: any) => {
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getReviews(animeId, setLoading, setError, setData, setReviews);
  }, [loading]);

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((review:any, index:number) => (
            <div key={index} className="review-container">
              <UpvoteDownvote review={review} />
              <Link to={`/profile/${review.username}`}>{review.username}</Link>
              <div><h3>{review.title}</h3><span>{review.rating}/10</span></div>
              <div>{review.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
