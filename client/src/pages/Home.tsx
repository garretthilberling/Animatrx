import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { Link } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import { parameter } from "../utils/types";

const Home = () => {
  const [apiData, setApiData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState<parameter[]>([
    // {
    //     filter: "text",
    //     by: "Code"
    // },
    // {
    //     filter: "genre",
    //     by: "adventure"
    // }
  ]);
  const [offset, setOffset] = useState(0);

  const handleNextResults = () => {
    setOffset((prev) => (prev += 20));
    setLoading(true);
  };

  const handlePrevResults = () => {
    if (offset > 0) {
      setOffset((prev) => (prev -= 20));
      setLoading(true);
    }
  };

  const setWidth = () => {
    let animeContainer = document.getElementById('anime-container') as HTMLElement;
    let style = window.getComputedStyle(animeContainer, "");
    let wdt = style.getPropertyValue('width');
    (document.querySelector('.btns-container') as HTMLElement).style.width = wdt;
  }

//   setWidth();

  useEffect(() => {
    KitsuApi.getAllAnime(setApiData, setLoading, setError, offset);
    console.log(apiData);
  }, [loading]);

  // useEffect(() => {
  //     KitsuApi.searchAnime(search, setApiData, setLoading, setError);
  // }, [search]);

  return (
    <div className="">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="page-container">
          <div className="anime-border">
          <div className="btns-container">
              <button
                className="prev-btn"
                type="submit"
                onClick={handlePrevResults}
              >
                Prev
              </button>
              <button
                className="next-btn"
                type="submit"
                onClick={handleNextResults}
              >
                Next
              </button>
          </div>
          {apiData.map((anime: any, index: number) => (
            <div key={index}>
              {anime?.attributes?.coverImage?.tiny && (
                <div className="anime-container">
                  <Link to={`/${anime.attributes.slug}/${anime.id}`}>
                    <img
                      src={anime?.attributes?.coverImage?.tiny}
                      alt="cover-img"
                      className="anime-img"
                    ></img>
                    <div className="anime-title-wrapper">
                      <p className="anime-title">
                        {anime?.attributes?.canonicalTitle}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
