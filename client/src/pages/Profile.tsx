import React, { useEffect, useState  } from "react";
import {getProfile} from "../utils/userRoutes";
import {useParams} from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import { parameter } from "../utils/types";

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
      KitsuApi.getMultipleAnimeById(id, data.watchLater, setWlData, wlUsed, setWlUsed, setWlLoading, setError);
    })
    // console.log(wlData);
  }

  const handleQueryFavorites = (data: any) => {
    // console.log(data.favorites);
    data.favorites.forEach((id: any) => {
      KitsuApi.getMultipleAnimeById(id, data.favorites, setFaveData, faveUsed, setFaveUsed, setFaveLoading, setError);
    })
    // console.log(faveUsed);
  }

  useEffect(() => {
    getProfile(username, setLoading, setError, setData);
    if(data && !loading) {
      if(wlLoading) handleQueryWatchLater(data);
      if(faveLoading) handleQueryFavorites(data);
    }
    // console.log(data);
  }, [loading]);

  return (
  <div className="">
    {loading || wlLoading || faveLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <div>Favorites: </div>
        <div>
          {faveData.length && faveData.map((fave:any, index:number) => (
            <div key={index}>{fave.attributes.canonicalTitle}</div>
          ))}
        </div>
        <div>Watch Later: </div>
        <div>
          {wlData.length && wlData.map((wl:any, index:number) => (
            <div key={index}>{wl.attributes.canonicalTitle}</div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
};

export default Profile;
