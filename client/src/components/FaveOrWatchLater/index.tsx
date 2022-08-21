import React, { useEffect, useState } from "react";
import authService from "../../utils/auth";
import { getProfile } from "../../utils/userRoutes";
import { addWatchLater, addFavorites } from "../../utils/animeRoutes";
import { useParams, useLocation } from "react-router-dom";
import { usernameQuery } from "../../utils/types";

const FaveOrWatchLater = () => {
  const [starSelected, setStarSelected] = useState(false);
  const [heartSelected, setHeartSelected] = useState(false);
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username: usernameQuery = {
    username: authService.getProfile().data.username,
  };
  const authToken = authService.getToken();
  const animeId = useParams().animeId;

  const handleStarSelect = () => {
    addWatchLater(animeId, username, setError, authToken);
    setStarSelected(prev => !prev);
  };

  const handleHeartSelect = () => {
    addFavorites(animeId, username, setError, authToken);
    setHeartSelected(prev => !prev);
  }

  useEffect(() => {
    getProfile(username.username, setLoading, setError, setData);
    if (data) {
      if (data.watchLater.includes(data.watchLater.find((wl: any) => wl.id === animeId))) {
        setStarSelected(true);
      }
      if (data.favorites.includes(data.favorites.find((fave: any) => fave.id === animeId))) {
        setHeartSelected(true);
      }
    }
  }, [loading]);

  return (
    <div className="fave-watch-later">
      <button onClick={handleStarSelect} className="fave-wl-btn">
        <i
          className={`fa-solid fa-star ${starSelected ? 'star-selected' : 'unselected'}`}
        ></i>{" "}
        Save to Watchlist
      </button>
      <button
        onClick={handleHeartSelect}
        className="fave-wl-btn"
      >
        <i
          className={`fa-solid fa-heart ${heartSelected ? 'heart-selected' : 'unselected'}`}
        ></i>{" "}
        Add to Favorites
      </button>
    </div>
  );
};

export default FaveOrWatchLater;
