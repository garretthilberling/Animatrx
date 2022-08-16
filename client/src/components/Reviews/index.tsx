import React, {useState, useEffect} from "react";
import { getReviews } from "../../utils/reviewRoutes";

const Reviews = ({ animeId }: any) => {
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getReviews(animeId, setLoading, setError, setData);
  }, [loading]);

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((review:any) => (
            <div>
              <div><h3>{review.title}</h3><span>{review.rating}</span></div>
              <div>{review.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
