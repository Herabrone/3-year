import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InteractiveMap.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({ mapData, onLocationRevealed }) => {
  const [revealedLocations, setRevealedLocations] = useState([]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const mapRef = useRef(null);

  const handleMapClick = () => {
    if (currentLocationIndex < mapData.locations.length) {
      const newLocation = mapData.locations[currentLocationIndex];
      setRevealedLocations(prev => [...prev, newLocation]);
      setCurrentLocationIndex(prev => prev + 1);
      
      if (onLocationRevealed) {
        onLocationRevealed(newLocation, currentLocationIndex + 1);
      }

      // Animate to the new location
      if (mapRef.current) {
        mapRef.current.flyTo(newLocation.coords, 13, {
          duration: 1.5
        });
      }
    }
  };

  const getProgressText = () => {
    if (currentLocationIndex === 0) {
      return "Tap anywhere to start our journey...";
    } else if (currentLocationIndex >= mapData.locations.length) {
      return "All our adventures revealed! ✨";
    } else {
      return `${currentLocationIndex} of ${mapData.locations.length} places revealed`;
    }
  };

  return (
    <div className="interactive-map-container">
      <div className="map-header">
        <h3>Our Adventure Map</h3>
        <p className="progress-text">{getProgressText()}</p>
      </div>
      
      <div className="map-wrapper" onClick={handleMapClick}>
        <MapContainer
          center={mapData.center}
          zoom={mapData.zoom}
          style={{ height: '400px', width: '100%' }}
          ref={mapRef}
          zoomControl={false}
          dragging={true}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {revealedLocations.map((location, index) => (
            <Marker key={location.id} position={location.coords}>
              <Popup>
                <div className="location-popup">
                  <h4>{location.name}</h4>
                  <p className="location-date">{location.date}</p>
                  <p className="location-description">{location.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {currentLocationIndex < mapData.locations.length && (
        <div className="next-location-hint">
          <p>Next: {mapData.locations[currentLocationIndex].name}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;