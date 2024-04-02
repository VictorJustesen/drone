import React, { useState } from 'react';
import Map from './map/Map';
import Top from './top/Top';
import Bot from './bot/Bot';
import Sidebar from './sidebar/Sidebar';

function App() {
  const [coordinates, setCoordinates] = useState(null);

  return (
    <div>
      <Top />
      <Sidebar />
      <Map onCoordinateChange={setCoordinates} />
      <Bot coordinates={coordinates} />
    </div>
  );
}

export default App;