import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthService from "./utils/auth";

import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Review from "./pages/Review";

function App() {
  return (
    <Router>
      <main>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:animeId" element={<Anime />} />
            <Route path="anime/:animeId/reviews" element={<Reviews />} />
            <Route path="anime/:animeId/reviews/:reviewId" element={<Review />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
