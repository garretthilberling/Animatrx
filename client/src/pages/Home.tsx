import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import { parameter } from "../utils/types";

const Home = () => {
    const [apiData, setApiData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState<parameter[]>([
        {
            filter: "text",
            by: "Code"
        },
        {
            filter: "genre",
            by: "adventure"
        }
    ])

    useEffect(() => {
        KitsuApi.searchAnime(search, setApiData, setLoading, setError);
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
                {anime?.attributes?.coverImage?.tiny && <img src={anime?.attributes?.coverImage?.tiny} alt="cover-img"></img>}
                <p>{anime?.attributes?.canonicalTitle}</p>
            </div>
          ))}  
        </div>
    )}
  </div>
  );
};

export default Home;
