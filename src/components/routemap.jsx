import React from 'react';
import './routemap.css';

const RouteMap = () => {
  return (
    <div className="route-map-container">
      <div className="route-map-content">
        <h1 className="route-map-heading">Bus Route Map</h1>
        <div className="route-map-image-container">
          <img src="route_map.jpg" alt="Bus Route Map" className="route-map-image" />
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
