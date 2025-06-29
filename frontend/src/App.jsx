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
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      {/* Header with user info and logout */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent'>
                SafeGuard
              </h1>
              <p className="text-gray-400 text-sm mt-1">Weather Safety & Location Monitoring</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-white font-medium">Welcome back, {user}!</div>
                <div className="text-gray-400 text-sm">Stay safe, stay connected</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-200 backdrop-blur-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Map and Location List Side by Side */}
        <div className='flex flex-col xl:flex-row gap-8 mb-12'>
          {/* Map Container - Larger and more prominent */}
          <div className='flex-1'>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-2">Live Safety Map</h2>
                <p className="text-gray-400">Real-time disaster tracking and your saved locations</p>
              </div>
              <div className="h-[600px]">
                <MapView 
                  mapCenter={mapCenter}
                  locations={locations}
                  onLocationUpdate={setLocations}
                />
              </div>
            </div>
          </div>
          
          {/* Location List Sidebar - More spacious */}
          <div className='w-full xl:w-96'>
            <div className='bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6'>
              <div className="mb-6">
                <h2 className='text-2xl font-semibold text-white mb-2'>Your Locations</h2>
                <p className="text-gray-400 text-sm">Manage your important places</p>
              </div>
              <LocationList 
                locations={locations} 
                setMapCenter={setMapCenter}
                onLocationUpdate={setLocations}
                username={user}
              />
            </div>
          </div>
        </div>
        
        {/* Location Form - Full width, more prominent */}
        <div className='bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8'>
          <div className="text-center mb-8">
            <h2 className='text-2xl font-semibold text-white mb-2'>Add New Location</h2>
            <p className="text-gray-400">Track important places like home, work, or family locations</p>
          </div>
          <LocationForm onLocationAdded={handleLocationAdded} username={user} />
        </div>
      </div>
    </div>
  );
}

export default App;