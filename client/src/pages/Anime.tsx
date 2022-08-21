import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import ReactPlayer from "react-player";
import YtApi from "../utils/ytSearchApi";
import { youtubeVideo } from "../utils/types";
import AuthService from "../utils/auth";
import FaveOrWatchLater from "../components/FaveOrWatchLater";
import ReviewForm from "../components/ReviewForm";
import Reviews from "../components/Reviews";

const Anime = () => {
  const [apiData, setApiData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [apiReviewsLoading, setApiReviewsLoading] = useState(true);
  const [error, setError] = useState("");
  const [video, setVideo] = useState({});
  const [reviews, setReviews] = useState<any>([]);
  const [apiReviewsUrl, setApiReviewsUrl] = useState("");
  const [apiReviews, setApiReviews] = useState<any>([]);
  let animeId = useParams().animeId as string;

  const getRating = (
    averageRating: number,
    apiRatings: any[],
    localReviews: any[]
  ) => {
    let apiRatingsCountArr = Object.values(apiRatings);
    let totalReviews = 0;
    totalReviews += localReviews.length;

    apiRatingsCountArr.map((rating) => (totalReviews += Number(rating)));

    let newRatings = 0;
    if(localReviews.length > 0) localReviews.map((review) => newRatings += review.rating);
    let localAvg = newRatings / localReviews.length
    // newAvg = (avg1 * size1 + avg2 * size2) / (size1 + size2)
    let adjustedRating;
    if(localReviews.length > 0) {
      adjustedRating = (localAvg * localReviews.length + averageRating * totalReviews) / (localReviews.length + totalReviews);
    } else {
      adjustedRating = averageRating;
    }

    return Math.round(adjustedRating * 10) / 100;
  };

  useEffect(() => {
    KitsuApi.getSingleAnime(animeId, setApiData, setApiReviewsUrl, setLoading, setError);
    // console.log(apiData);
  }, [loading]);
  useEffect(() => {
    if(apiReviewsUrl) KitsuApi.getAnimeReviews(apiReviewsUrl, setApiReviews, setApiReviewsLoading, setError);

  }, [apiReviewsUrl, apiReviewsLoading]);

  // useEffect(() => {
  //   // YtApi.ytReq(apiData?.attributes?.canonicalTitle);
  //   // .then((data) => {
  //   //   setVideo(data);
  //   //   data.json();
  //   // })
  //   // .catch((error) => console.log(error));
  //   // console.log(video);
  // }, [apiData]);
  return (
    <div className="body">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="single-page-container">
          <div className="single-anime-border">
            <div>
              {apiData?.attributes?.coverImage?.tiny && (
                <div className="single-anime-container">
                  <img
                    src={apiData?.attributes?.posterImage?.large}
                    alt="cover-img"
                    className="single-anime-img"
                  ></img>
                  <div className="single-description-container">
                    <div className="single-description-card">
                      <>
                        <h3>
                          {apiData?.attributes?.canonicalTitle} (
                          {apiData?.attributes?.startDate})
                        </h3>
                        <h4>{apiData?.attributes?.titles?.en_jp}</h4>
                        <span>
                          <>
                            {getRating(
                              apiData?.attributes?.averageRating,
                              apiData?.attributes?.ratingFrequencies,
                              reviews
                            )}
                            /10
                          </>
                        </span>
                        {AuthService.loggedIn() && <FaveOrWatchLater />}
                        <p>{apiData?.attributes?.description}</p>
                      </>
                      <div className="youtube-trailer">
                        {apiData?.attributes?.youtubeVideoId ? (
                          <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${apiData?.attributes?.youtubeVideoId}`}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="reviews-container">
                      <>
                        {AuthService.loggedIn() && (
                          <ReviewForm animeId={animeId} />
                        )}
                        <Reviews animeId={animeId} setReviews={setReviews} apiReviews={apiReviews} />
                      </>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
