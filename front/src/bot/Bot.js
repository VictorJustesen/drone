import React, { useState } from 'react';
import './Bot.scss';

const Bot = ({ coordinates }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleGoClick = () => {
    // You will need to implement a function that pans the map to the new coordinates.
    console.log('Panning to: ', lat, lng);
  };

  return (
    <div className="Bot">
      <div className="coordinates-display">
        {coordinates && `X: ${coordinates.lat.toFixed(5)}, Y: ${coordinates.lng.toFixed(5)}`}
      </div>
      <div className="coordinate-inputs">
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <button onClick={handleGoClick}>Go</button>
      </div>
    </div>
  );
};

export default Bot;