import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Footer from "./components/Footer";
import Header from "./components/Header";

import AuthService from "./utils/auth";

function App() {
  return (
    <Router>
      <main className="page-container">
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/:animeName/:animeId" element={<Anime />} />
            <Route path="anime/:animeId/reviews" element={<Reviews />} />
            <Route path="anime/:animeId/reviews/:reviewId" element={<Review />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
