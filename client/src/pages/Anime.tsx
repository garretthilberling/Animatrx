import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import ReactPlayer from 'react-player';
import YtApi from "../utils/ytSearchApi";
import { youtubeVideo } from "../utils/types";


const Anime = () => {
  const [apiData, setApiData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [video, setVideo] = useState({});
  let animeId = useParams().animeId as string;

  useEffect(() => {
    KitsuApi.getSingleAnime(animeId, setApiData, setLoading, setError);
  }, [loading]);
  
  useEffect(() => {
    YtApi.ytReq(apiData?.attributes?.canonicalTitle);
  }, [apiData])
  return (
    <div className="">
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
                    <h3>{apiData?.attributes?.canonicalTitle} ({apiData?.attributes?.startDate})</h3>
                    <h4>{apiData?.attributes?.titles?.en_jp}</h4>
                    <span>{Math.round(apiData?.attributes?.averageRating * 10) / 100}/10</span>
                    <p>{apiData?.attributes?.description}</p>
                    <div className="youtube-trailer">
                      {apiData?.attributes?.youtubeVideoId ? (
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${apiData?.attributes?.youtubeVideoId}`} />
                      ) : (
                        <></>
                      )}
                    </div></div>
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
