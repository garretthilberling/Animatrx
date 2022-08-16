import React, { useEffect, useState } from "react";
import authService from "../../utils/auth";
import { getProfile } from "../../utils/userRoutes";
import { addWatchLater, addFavorites } from "../../utils/animeRoutes";
import { useParams } from "react-router-dom";
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
      if (data.watchLater.includes(animeId)) {
        setStarSelected(true);
      }
      if (data.favorites.includes(animeId)) {
        setHeartSelected(true);
      }
    }
  }, [loading]);

  return (
    <div className="fave-watch-later">
      <button onClick={handleStarSelect} className="fave-wl-btn">
        <i
          className={`fa-solid fa-star unselected ${starSelected && "star-selected"}`}
        ></i>{" "}
        Save to Watchlist
      </button>
      <button
        onClick={handleHeartSelect}
        className="fave-wl-btn"
      >
        <i
          className={`fa-solid fa-heart unselected ${heartSelected && "heart-selected"}`}
        ></i>{" "}
        Add to Favorites
      </button>
    </div>
  );
};

export default FaveOrWatchLater;
