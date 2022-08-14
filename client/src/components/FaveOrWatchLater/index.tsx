import React, { useEffect, useState } from "react";
import authService from "../../utils/auth";
import { getProfile } from "../../utils/userRoutes";
import {useParams} from "react-router-dom";

const FaveOrWatchLater = () => {
  const [starSelected, setStarSelected] = useState(false);
  const [heartSelected, setHeartSelected] = useState(false);
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = authService.getProfile().data.username;
  const animeId = useParams().animeId;

  useEffect(() => {
    getProfile(username, setLoading, setError, setData);
    console.log(data.watchLater);
    if(data) {
        if(data.watchLater.includes(animeId)) {
            setStarSelected(true);
        }
        if(data.favorites.includes(animeId)) {
            setHeartSelected(true);
        }
    }
  }, [loading]);

  return (
    <div className="fave-watch-later">
      <button
        onClick={() => setStarSelected((prev) => !prev)}
        className="submit"
      >
        <i
          className={`fa-solid fa-star ${starSelected && "star-selected"}`}
        ></i>{" "}
        Save to Watchlist
      </button>
      <button
        onClick={() => setHeartSelected((prev) => !prev)}
        className="submit"
      >
        <i
          className={`fa-solid fa-heart ${heartSelected && "heart-selected"}`}
        ></i>{" "}
        Add to Favorites
      </button>
    </div>
  );
};

export default FaveOrWatchLater;
