import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";

const Header = () => {
  const logout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    AuthService.logout();
  };
  let username;
  if(AuthService.loggedIn()) username = AuthService.getProfile().data.username;
  return (
    <div className="header">
      <div>
        <Link to="/" className="font-logo">
          Animatrx
        </Link>
      </div>
      <ul className="nav-bar">
        {AuthService.loggedIn() ? (
          <>
            <li>
              <button onClick={(e) => logout(e)} className="nav-btn">
                Logout
              </button>
            </li>
            <li>
              <Link to={`/profile/${username}`} className="nav-btn">
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-btn">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-btn">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
