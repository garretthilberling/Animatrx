import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="font-logo">
      Animatrx
      </Link>
    </div>
  );
};

export default Header;
