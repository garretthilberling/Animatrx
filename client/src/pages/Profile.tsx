import React, { useEffect, useState  } from "react";
import {getProfile} from "../utils/userRoutes";
import {useParams} from "react-router-dom";

const Profile = () => {
  const username: string | undefined = useParams().username;
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile(username, setLoading, setError, setData);
    console.log(data);
  }, [loading]);

  return (
  <div className="">
    {loading ? (
      <div>Loading...</div>
    ) : (
      <div>data.username</div>
    )}
  </div>
  );
};

export default Profile;
