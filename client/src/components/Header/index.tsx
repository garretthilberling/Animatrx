import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="font-logo">
        YourAnimeList
      </Link>
    </div>
  );
};

export default Header;
