import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'leaflet/dist/leaflet.css';
import MapView from './components/MapView';
import LocationForm from './components/LocationForm';
import LocationList from './components/LocationList';
import { getLocations } from './services/locationService';

function App() {
  const [count, setCount] = useState(0);
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]); // Default to San Francisco

  // Load locations on component mount
  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const locationData = await getLocations();
      setLocations(locationData);
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  return (
    <div className='p-4 min-h-screen bg-[#1a1a1a]'>
      <h1 className='text-3xl font-bold mb-6 text-white text-center'>Weather Safety App</h1>
      
      {/* Map and Location List Side by Side */}
      <div className='flex flex-col lg:flex-row gap-4 mb-6'>
        {/* Map Container - Takes up most of the width */}
        <div className='flex-1 min-h-[400px]'>
          <MapView 
            mapCenter={mapCenter}
            locations={locations}
            onLocationUpdate={setLocations}
          />
        </div>
        
        {/* Location List Sidebar */}
        <div className='w-full lg:w-80 bg-[#242424] rounded-lg p-4 border border-[#333]'>
          <h2 className='text-xl font-semibold text-white mb-3'>Saved Locations</h2>
          <LocationList 
            locations={locations} 
            setMapCenter={setMapCenter}
            onLocationUpdate={setLocations}
          />
        </div>
      </div>
      
      {/* Location Form Below the Map */}
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-xl font-semibold text-white mb-3 text-center'>Add New Location</h2>
        <LocationForm onLocationAdded={loadLocations} />
      </div>
    </div>
  );
}

export default App;