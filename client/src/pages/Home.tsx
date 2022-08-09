import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KitsuApi from "../utils/animeApi";

const Home = () => {
    const [apiData, setApiData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        KitsuApi.getAnimeByTitle("Attack on Titan", setApiData, setLoading, setError);
    }, []);
    
    useEffect(() => {
        console.log(apiData);
    }, [apiData]);
    
  return (
  <div className="">
    {loading ? (<div>Loading...</div>) : (
        <div>
          {apiData.map((anime: any, index: number) => (
            <div key={index}>
                {anime?.attributes?.canonicalTitle}
            </div>
          ))}  
        </div>
    )}
  </div>
  );
};

export default Home;
