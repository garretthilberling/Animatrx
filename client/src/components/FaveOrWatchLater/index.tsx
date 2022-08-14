import React, { useEffect, useState} from "react";

const FaveOrWatchLater = () => {
    const [starSelected, setStarSelected] = useState(false);
    const [heartSelected, setHeartSelected] = useState(false);

  return (
  <div className="fave-watch-later">
    <button onClick={() => setStarSelected(prev => !prev)} className="submit"><i className={`fa-solid fa-star ${starSelected && 'star-selected'}`}></i> Save to Watchlist</button>
    <button onClick={() => setHeartSelected(prev => !prev)} className="submit"><i className={`fa-solid fa-heart ${heartSelected && 'heart-selected'}`}></i> Add to Favorites</button>
  </div>
  );
};

export default FaveOrWatchLater;
