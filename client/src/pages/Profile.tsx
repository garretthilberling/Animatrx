import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/userRoutes";
import { useParams } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import { parameter } from "../utils/types";
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
    data.watchLater.forEach((id: any) => {
      KitsuApi.getMultipleAnimeById(
        id,
        data.watchLater,
        setWlData,
        wlUsed,
        setWlUsed,
        setWlLoading,
        setError
      );
    });
    // console.log(wlData);
  };

  const handleQueryFavorites = (data: any) => {
    // console.log(data.favorites);
    data.favorites.forEach((id: any) => {
      KitsuApi.getMultipleAnimeById(
        id,
        data.favorites,
        setFaveData,
        faveUsed,
        setFaveUsed,
        setFaveLoading,
        setError
      );
    });
    // console.log(faveUsed);
  };

  useEffect(() => {
    getProfile(username, setLoading, setError, setData);
    if (data && !loading) {
      if (wlLoading) handleQueryWatchLater(data);
      if (faveLoading) handleQueryFavorites(data);
    }
    // console.log(data);
  }, [loading]);

  return (
    <div className="page">
      {loading || wlLoading || faveLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile-container">
          <h2 className="profile-header">Favorites</h2>
          <div className="content-container">
            {faveData.length &&
              faveData.map((fave: any, index: number) => (
                <div className="content-card" key={index}>
                  <Link to={`/${fave.attributes.slug}/${fave.id}`}>
                    <img
                      src={
                        fave.attributes.coverImage.tiny
                          ? fave.attributes.coverImage.tiny
                          : fave.attributes.coverImage.small
                      }
                      className="anime-img anime-img-top-border"
                      alt="cover-art"
                    ></img>
                    <div className="anime-title-wrapper">
                      <p className="anime-title">
                        {fave?.attributes?.canonicalTitle}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <h2 className="profile-header">Watch Later</h2>
          <div className="content-container">
            {wlData.length &&
              wlData.map((wl: any, index: number) => (
                <div className="content-card" key={index}>
                  <Link to={`/${wl.attributes.slug}/${wl.id}`}>
                    <img
                      src={
                        wl.attributes.coverImage.tiny
                          ? wl.attributes.coverImage.tiny
                          : wl.attributes.coverImage.small
                      }
                      className="anime-img anime-img-top-border"
                      alt="cover-art"
                    ></img>
                    <div className="anime-title-wrapper">
                      <p className="anime-title">
                        {wl?.attributes?.canonicalTitle}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
