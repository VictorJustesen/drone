import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle,Polyline  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function App() {
  const [userInput, setUserInput] = useState({
    maxFlightTime: '',
    maxTimeInZone: '',
    minPoints: '',
  });
  const [pois, setPois] = useState([{ id: 'poi1', lat: 51.505, lng: -0.09, radius:200 }]);
  const [noFlyZones, setNoFlyZones] = useState([{ id: 'zone1', lat: 51.505, lng: -0.11, radius: 200 }]);

  const [newPOI, setNewPOI] = useState({ lat: '', lng: '', radius: '' });
  const [newNFZ, setNewNFZ] = useState({ lat: '', lng: '', radius: '' });

  const [startPoint, setStartPoint] = useState({ lat: 51.505, lng: -0.13, });

  useEffect(() => {
    const calculateOptimalPath = () => {
      let path
      //path needs to be under min time, go through min nodes and not go through max nfz. 
      // length from node to node, is pythagoras, right now length = time and weight of the edge
      // first try to avoid the nfz by placing point at edge closes to nearest POi then try a point more and more straight through the cirle to next POI


      return path
    };
  
    const optimalPath = calculateOptimalPath();
    if (!optimalPath) {
      // Display "Not possible" message on page
    } else {
      // Update state to render the new optimal path
    }
  }, [pois, noFlyZones, startPoint, userInput]); 



const addStartPoint = (e) => {
    e.preventDefault();
    // Ensure the start point is valid before setting it
    if(startPoint.lat && startPoint.lng) {
        // Optionally, you can add more validation to ensure lat and lng are within valid ranges
        setStartPoint({ ...startPoint });
    }
};
  const addPOI = (e) => {
    e.preventDefault();
    setPois([...pois, newPOI]);
    setNewPOI({ lat: '', lng: '', radius: '' });
  };

  const addNFZ = (e) => {
    e.preventDefault();
    setNoFlyZones([...noFlyZones, newNFZ]);
    setNewNFZ({ lat: '', lng: '', radius: '' });
  };

  const handleSubmit = (input) => {
    setUserInput({
      maxFlightTime: input.maxFlightTime,
      maxTimeInZone: input.maxTimeInZone,
      minPoints: input.minPoints,
    });
    // Call your optimization algorithm here and update the state with the results
    // This is where you'd calculate the optimal path and update POIs and no-fly zones accordingly
    // For demonstration, I'm using placeholder values
    
  };

  const poiPositions = pois.map(poi => [poi.lat, poi.lng]);

  function InputForm({ onSubmit }) {
    const [maxFlightTime, setMaxFlightTime] = useState('');
    const [maxTimeInZone, setMaxTimeInZone] = useState('');
    const [minPoints, setMinPoints] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ maxFlightTime, maxTimeInZone, minPoints });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="number" value={maxFlightTime} onChange={(e) => setMaxFlightTime(e.target.value)} placeholder="Max Flight Time" required />
        <input type="number" value={maxTimeInZone} onChange={(e) => setMaxTimeInZone(e.target.value)} placeholder="Max Time in No-Fly Zone" required />
        <input type="number" value={minPoints} onChange={(e) => setMinPoints(e.target.value)} placeholder="Minimum Points of Interest" required />
        <button type="submit">Submit</button>
      </form>
    );
  }
  return (
    <div>
       <h2>Add Start Point</h2>
      <form onSubmit={addStartPoint}>
        <input type="number" value={startPoint.lat} onChange={(e) => setStartPoint({ ...startPoint, lat: e.target.value })} placeholder="Start Latitude" required />
        <input type="number" value={startPoint.lng} onChange={(e) => setStartPoint({ ...startPoint, lng: e.target.value })} placeholder="Start Longitude" required />
        <button type="submit">Set Start Point</button>
      </form>
            <h2>Add Point of Interest</h2>
      <form onSubmit={addPOI}>
        <input type="number" value={newPOI.lat} onChange={(e) => setNewPOI({ ...newPOI, lat: e.target.value })} placeholder="Latitude" required />
        <input type="number" value={newPOI.lng} onChange={(e) => setNewPOI({ ...newPOI, lng: e.target.value })} placeholder="Longitude" required />
        <input type="number" value={newPOI.radius} onChange={(e) => setNewPOI({ ...newPOI, radius: e.target.value })} placeholder="Radius" required />
        <button type="submit">Add POI</button>
      </form>

      <h2>Add No-Fly Zone</h2>
      <form onSubmit={addNFZ}>
        <input type="number" value={newNFZ.lat} onChange={(e) => setNewNFZ({ ...newNFZ, lat: e.target.value })} placeholder="Latitude" required />
        <input type="number" value={newNFZ.lng} onChange={(e) => setNewNFZ({ ...newNFZ, lng: e.target.value })} placeholder="Longitude" required />
        <input type="number" value={newNFZ.radius} onChange={(e) => setNewNFZ({ ...newNFZ, radius: e.target.value })} placeholder="Radius" required />
        <button type="submit">Add NFZ</button>
      </form>

      <InputForm onSubmit={handleSubmit} />
      <MapDisplay startPoint={startPoint} pois={pois} noFlyZones={noFlyZones} />
    </div>
  );
}

function InputForm({ onSubmit }) {
  const [maxFlightTime, setMaxFlightTime] = useState('');
  const [maxTimeInZone, setMaxTimeInZone] = useState('');
  const [minPoints, setMinPoints] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ maxFlightTime, maxTimeInZone, minPoints });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={maxFlightTime} onChange={(e) => setMaxFlightTime(e.target.value)} placeholder="Max Flight Time" required />
      <input type="number" value={maxTimeInZone} onChange={(e) => setMaxTimeInZone(e.target.value)} placeholder="Max Time in No-Fly Zone" required />
      <input type="number" value={minPoints} onChange={(e) => setMinPoints(e.target.value)} placeholder="Minimum Points of Interest" required />
      <button type="submit">Submit</button>
    </form>
  );
}

function MapDisplay({ startPoint, pois, noFlyZones }) {
  // Prepare positions for polyline, ensuring the start point, if defined, is included
  const pathPositions = [startPoint, ...pois].reduce((acc, curr) => {
    if (curr.lat && curr.lng) {
      acc.push([parseFloat(curr.lat), parseFloat(curr.lng)]);
    }
    return acc;
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {startPoint.lat && startPoint.lng && (
        <Marker position={[startPoint.lat, startPoint.lng]} icon={new L.Icon({ iconUrl: 'marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] })} />
      )}
      {pois.map((poi, index) => (
        <React.Fragment key={`poi-${index}`}>
          <Marker position={[poi.lat, poi.lng]} />
          <Circle center={[poi.lat, poi.lng]} radius={poi.radius} color="blue" />
        </React.Fragment>
      ))}
      {noFlyZones.map((zone, index) => (
        <Circle key={`nfz-${index}`} center={[zone.lat, zone.lng]} radius={zone.radius} color="red" />
      ))}
      {pathPositions.length > 1 && (
        <Polyline positions={pathPositions} color="lime" />
      )}
    </MapContainer>
  );
}

export default App;
