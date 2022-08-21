import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/userRoutes";
import { useParams } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import { parameter, faveWlData } from "../utils/types";
import { Link } from "react-router-dom";

const Profile = () => {
  const username: string | undefined = useParams().username;

  // this user
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // watch later
  const [wlLoading, setWlLoading] = useState(true);
  const [wlData, setWlData] = useState<any>("");
  const [wlUsed, setWlUsed] = useState<string[]>([]);

  // favorites
  const [faveLoading, setFaveLoading] = useState(true);
  const [faveData, setFaveData] = useState<any>("");
  const [faveUsed, setFaveUsed] = useState<string[]>([]);

  const handleQueryWatchLater = (data: any) => {
    console.log(data.watchLater)
    data.watchLater.forEach((wl: any) => {
      if(wl.id) {
        KitsuApi.getMultipleAnimeById(
          wl.id,
          wl.dateAdded,
          data.watchLater,
          setWlData,
          wlUsed,
          setWlUsed,
          setWlLoading,
          setError
        );
      }
    });
  };

  const handleQueryFavorites = (data: any) => {
    data.favorites.forEach((fave: any) => {
      if(fave.id) {
        KitsuApi.getMultipleAnimeById(
          fave.id,
          fave.dateAdded,
          data.favorites,
          setFaveData,
          faveUsed,
          setFaveUsed,
          setFaveLoading,
          setError
        );
      }
    });
  };

  useEffect(() => {
    getProfile(username, setLoading, setError, setData);
    if (data) {
      if (wlLoading) handleQueryWatchLater(data);
      if (faveLoading) handleQueryFavorites(data);
    }
  }, [loading]);

  return (
    <div className="page">
      {loading || (wlData && wlLoading) || (faveData && faveLoading) ? (
        <div>Loading...</div>
      ) : (
        <div className="profile-container">
          <h2 className="profile-header">Favorites</h2>
          <div className="content-container">
            {faveData.length ? (
              faveData.map((fave: any, index: number) => (
                <div className="content-card" key={index}>
                  <Link to={`/${fave.data.attributes.slug}/${fave.data.id}`}>
                    <img
                      src={
                        fave.data.attributes.coverImage.tiny
                          ? fave.data.attributes.coverImage.tiny
                          : fave.data.attributes.coverImage.small
                      }
                      className="anime-img anime-img-top-border"
                      alt="cover-art"
                    ></img>
                    <div className="anime-title-wrapper">
                      <p className="anime-title">
                        {fave.data?.attributes?.canonicalTitle}
                      </p>
                    </div>
                  </Link>
                </div>
              ))) : (
                <div>None yet!</div>
              )}
          </div>
          <h2 className="profile-header">Watch Later</h2>
          <div className="content-container">
            {wlData.length ? (
              wlData.map((wl: any, index: number) => (
                <div className="content-card" key={index}>
                  <Link to={`/${wl.data.attributes.slug}/${wl.data.id}`}>
                    <img
                      src={
                        wl.data.attributes.coverImage.tiny
                          ? wl.data.attributes.coverImage.tiny
                          : wl.data.attributes.coverImage.small
                      }
                      className="anime-img anime-img-top-border"
                      alt="cover-art"
                    ></img>
                    <div className="anime-title-wrapper">
                      <p className="anime-title">
                        {wl.data?.attributes?.canonicalTitle}
                      </p>
                    </div>
                  </Link>
                </div>
              ))) : (
                <div>None yet!</div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
