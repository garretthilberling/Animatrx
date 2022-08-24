import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { Link } from "react-router-dom";
import KitsuApi from "../utils/animeApi";
import { parameter } from "../utils/types";

const Home = () => {
  const [apiData, setApiData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState<parameter[]>([]);
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

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setOffset(0);
    setLoading(true);

    if (e.currentTarget.value) {
      setSearch([
        {
          filter: "text",
          by: e.currentTarget.value,
        },
      ]);
    } else {
      setSearch([]);
    }
  };

  useEffect(() => {
    if (search) {
      setTimeout(() => {
        KitsuApi.searchAnime(search, setApiData, setLoading, setError, offset);
      }, 1000); // only sends request when user stops typing
    } else {
      KitsuApi.searchAnime(search, setApiData, setLoading, setError, offset);
    }
  }, [loading, search, offset]);

  return (
    <div className="">
      <div className="page-container">
        <div className="anime-border">
          <div
            className={`btns-container ${loading && "btns-container-bottom"}`}
          >
            <button
              className="prev-btn"
              type="submit"
              onClick={handlePrevResults}
            >
              Prev
            </button>
            <input
              type="text"
              className="search-bar"
              placeholder="Search by name"
              onChange={handleSearch}
            ></input>
            <button
              className="next-btn"
              type="submit"
              onClick={handleNextResults}
            >
              Next
            </button>
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            apiData.map((anime: any, index: number) => (
              <div className="" key={index}>
                {anime?.attributes?.coverImage?.tiny && (
                  <div
                    className={`anime-container ${
                      index !== 0 && "anime-container-top-border"
                    }`}
                  >
                    <Link to={`/${anime.attributes.slug}/${anime.id}`}>
                      <img
                        src={
                          anime.attributes.coverImage.tiny
                            ? anime.attributes.coverImage.tiny
                            : anime.attributes.coverImage.small
                        }
                        alt="cover-img"
                        className={`anime-img ${
                          index !== 0 && "anime-img-top-border"
                        }`}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
