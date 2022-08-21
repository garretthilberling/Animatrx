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
  const [error, setError] = useState("");
  const [video, setVideo] = useState({});
  let animeId = useParams().animeId as string;

  useEffect(() => {
    KitsuApi.getSingleAnime(animeId, setApiData, setLoading, setError);
    console.log(apiData);
  }, [loading]);

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
                          {Math.round(apiData?.attributes?.averageRating * 10) /
                            100}
                          /10
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
                          <Reviews animeId={animeId} />
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
