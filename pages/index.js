import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>My Leaflet Map</h1>
      <MapComponent />
    </div>
  );
}
