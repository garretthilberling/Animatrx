import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import KitsuApi from "../utils/animeApi";

const Home = () => {

    useEffect(() => {
        KitsuApi.getAnimeByGenre("adventure")
    }, []);

  return <div className=""></div>;
};

export default Home;
