import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss'

const position = [49.2785566, 31.1420338];

const MapEvents = ({ onEvent }) => {
  const map = useMapEvents({
    mousemove: (e) => {
      onEvent(e.latlng);
    }
  });
  return null;
};

const Map = ({ onCoordinateChange }) => {
  return (
    <MapContainer className='Map' center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapEvents onEvent={onCoordinateChange} />
    </MapContainer>
  );
};

export default Map;