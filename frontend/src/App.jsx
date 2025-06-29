import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'leaflet/dist/leaflet.css';
import MapView from './components/MapView';
import LocationForm from './components/LocationForm';
import LocationList from './components/LocationList';
import AuthPage from './components/AuthPage';
import { getLocations } from './services/locationService';

function App() {
  const [count, setCount] = useState(0);
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]); // Default to San Francisco
  const [user, setUser] = useState(null); // Current logged-in user
  const [isLoading, setIsLoading] = useState(true);

  // Load locations on initial app load if user is already logged in
  useEffect(() => {
    const checkForSavedUser = async () => {
      const savedUser = localStorage.getItem('weatherapp_user');
      if (savedUser) {
        setUser(savedUser);
        await loadLocations(savedUser);
      }
      setIsLoading(false);
    };
    checkForSavedUser();
  }, []);

  // Clear locations when user logs out (keep useEffect for logout only)
  useEffect(() => {
    if (!user) {
      setLocations([]);
    }
  }, [user]);

  // Debug: watch locations state changes
  useEffect(() => {
    console.log('App: locations state updated:', locations);
  }, [locations]);

  const loadLocations = async (currentUser) => {
    const userToLoad = currentUser || user;
    if (!userToLoad) return;

    try {
      const locationData = await getLocations(userToLoad);
      setLocations(locationData);
    } catch (error) {
      console.error("Error loading locations:", error);
      setLocations([]);
    }
  };

  const handleLogin = async (username) => {
    setUser(username);
    localStorage.setItem('weatherapp_user', username);
    await loadLocations(username); // Pass user directly
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('weatherapp_user');
    setLocations([]);
  };

  const handleLocationAdded = () => {
    loadLocations(); // Refresh locations after adding
  };

  const handleLocationDeleted = () => {
    loadLocations(); // Refresh locations after deleting
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage onAuth={handleLogin} />;
  }

  // Show main app if logged in
  return (
    <div className='p-4 min-h-screen bg-[#1a1a1a]'>
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-3xl font-bold text-white'>Weather Safety App</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Welcome, {user}!</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
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
            username={user}
          />
        </div>
      </div>
      
      {/* Location Form Below the Map */}
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-xl font-semibold text-white mb-3 text-center'>Add New Location</h2>
        <LocationForm onLocationAdded={handleLocationAdded} username={user} />
      </div>
    </div>
  );
}

export default App;