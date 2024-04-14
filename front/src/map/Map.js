import React, { useEffect } from 'react';

const WindyMap = ({ apiKey, onCoordinateChange }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.windy.com/assets/libBoot.js';
    script.async = true;

    script.onload = () => {
      const options = {
        key: apiKey,
        lat: 49.2785566,
        lon: 31.1420338,
        zoom: 5,
      };

      window.windyInit(options, windyAPI => {
        const { map } = windyAPI;
        const L = window.L;

        // Listen for map clicks and update coordinates
        map.on('click', function(e) {
          const { lat, lng } = e.latlng;
          onCoordinateChange({ lat, lng });
        });

        // Optionally display a popup on load
        L.popup()
          .setLatLng([options.lat, options.lon])
          .setContent('Coordinates: ' + options.lat + ', ' + options.lon)
          .openOn(map);
      });
    };

    script.onerror = (error) => {
      console.error('Failed to load the Windy API script:', error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey, onCoordinateChange]);

  return <div id="windy" style={{ height: '100%', width: '100%' }} />;
};



const Map = ({ onCoordinateChange }) => {
  const apiKey = process.env.REACT_APP_WINDY_API_KEY;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <WindyMap apiKey={apiKey} onCoordinateChange={onCoordinateChange} />
    </div>
  );
};

export default Map;