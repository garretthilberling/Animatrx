import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import ReactPlayer from 'react-player';

const Anime = () => {
  const [apiData, setApiData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let animeId = useParams().animeId as string;

  useEffect(() => {
    KitsuApi.getSingleAnime(animeId, setApiData, setLoading, setError);
  }, [loading]);
  return (
    <div className="">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="page-container">
          <div className="anime-border">
            <div>
              {apiData?.attributes?.coverImage?.tiny && (
                <div className="anime-container">
                  <img
                    src={apiData?.attributes?.posterImage?.large}
                    alt="cover-img"
                    className="anime-img"
                  ></img>
                  <div className="description-card">
                    <h3>{apiData?.attributes?.canonicalTitle} ({apiData?.attributes?.startDate})</h3>
                    <h4>{apiData?.attributes?.titles?.en_jp}</h4>
                    <span>{Math.round(apiData?.attributes?.averageRating * 10) / 100}/10</span>
                    <p>{apiData?.attributes?.description}</p>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${apiData?.attributes?.youtubeVideoId}`} />
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
