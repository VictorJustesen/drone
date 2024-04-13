import React, { useEffect } from 'react';

const WindyMap = ({ apiKey }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.windy.com/assets/libBoot.js';
    script.async = true;

    script.onload = () => {
      // Initialization options for Windy API
      const options = {
        key: apiKey,
        lat: 49.2785566,
        lon: 31.1420338,
        zoom: 5,
      };

      // Initialize Windy API
      window.windyInit(options, windyAPI => {
        const { map } = windyAPI;
        const L = window.L; // Access Leaflet from Windy API's scope
        L.popup()
          .setLatLng([49.2785566, 31.1420338])
          .setContent('Hello World')
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
  }, [apiKey]);

  return <div id="windy" style={{ height: '100%', width: '100%' }} />;
};

const Map = () => {
  const apiKey = process.env.REACT_APP_WINDY_API_KEY;  // Ideally, use an environment variable here

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <WindyMap apiKey={apiKey} />
    </div>
  );
};

export default Map;