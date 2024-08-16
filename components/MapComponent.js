import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';

// Dynamically import React Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

// Fix for Leaflet's missing default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Marker data array
const markers = [
  { position: [28.6139, 77.209], label: 'New Delhi' },
  { position: [19.076, 72.8777], label: 'Mumbai' },
  { position: [13.0827, 80.2707], label: 'Chennai' },
  { position: [22.5726, 88.3639], label: 'Kolkata' },
  { position: [12.9716, 77.5946], label: 'Bangalore' },
];

const MapComponent = () => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Center of India
  const [isClient, setIsClient] = useState(false);

  // Ensure the map only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{
              click: () => {
                setCenter(marker.position);
              },
            }}
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
