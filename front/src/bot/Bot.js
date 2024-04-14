import React, { useState } from 'react';
import './Bot.scss';

const Bot = ({ coordinates }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleGoClick = () => {
    // You will need to implement a function that pans the map to the new coordinates.
  };

  return (
    <div className="Bot">
      <div className="xcord">
        {coordinates && `X: ${coordinates.lat.toFixed(5)}`}
       
      </div>
      <div className="ycord">
      { coordinates && `Y: ${coordinates.lng.toFixed(5)}`}
      </div>
      
        <input className="iycord"
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
         className="ixcord"
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <button onClick={handleGoClick}>GO</button>
      
    </div>
  );
};

export default Bot;