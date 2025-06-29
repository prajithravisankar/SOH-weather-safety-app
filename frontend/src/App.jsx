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
  const [selectedMarker, setSelectedMarker] = useState(null); // For radial search feature
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

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

  const handleMarkerClick = (marker, type) => {
    setSelectedMarker({ ...marker, type });
  };

  const handleRadialSearch = () => {
    setSearchInProgress(true);
    // This will trigger the animation in MapView
  };

  const handleSearchComplete = (result) => {
    setSearchInProgress(false);
    setSearchResult(result);
  };

  const clearSearch = () => {
    setSelectedMarker(null);
    setSearchResult(null);
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
        <div className="w-full px-6 py-4">
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
      <div className="w-full px-6 py-8">
        {/* Map and Location List Side by Side */}
        <div className='flex flex-col xl:flex-row gap-8 mb-12 h-full'>
          {/* Map Container - Larger and more prominent */}
          <div className='flex-1 min-h-[600px]'>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden h-full">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-2">Live Safety Map</h2>
                <p className="text-gray-400">Real-time disaster tracking and your saved locations</p>
              </div>
              <div className="h-[calc(100%-120px)] min-h-[500px]">
                <MapView 
                  mapCenter={mapCenter}
                  locations={locations}
                  onLocationUpdate={setLocations}
                  onMarkerClick={handleMarkerClick}
                  selectedMarker={selectedMarker}
                  searchInProgress={searchInProgress}
                  onSearchComplete={handleSearchComplete}
                  searchResult={searchResult}
                />
              </div>
            </div>
          </div>
          
          {/* Location List Sidebar - More spacious */}
          <div className='w-full xl:w-80 2xl:w-96'>
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
        
        {/* Radial Search Button - appears when marker is selected */}
        {selectedMarker && !searchInProgress && (
          <div className="mt-8 mb-8 flex justify-center">
            <button
              onClick={handleRadialSearch}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-200 flex items-center gap-3"
            >
              <span className="text-2xl">🎯</span>
              <span>
                {selectedMarker.type === 'disaster' 
                  ? 'Find Nearest Impact Location' 
                  : 'Find Nearest Threat'}
              </span>
            </button>
          </div>
        )}
        
        {searchInProgress && (
          <div className="mt-8 mb-8 flex justify-center">
            <div className="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center gap-3">
              <div className="animate-spin w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"></div>
              <span className="text-white font-medium">Searching for nearest location...</span>
            </div>
          </div>
        )}
        
        {searchResult && (
          <div className="mt-8 mb-8 w-full">
            {searchResult.title || searchResult.name ? (
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl border border-green-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Match Found!</h3>
                      <p className="text-green-400 font-semibold text-lg">
                        {searchResult.name || searchResult.title}
                      </p>
                      <p className="text-gray-300">
                        Distance: <span className="font-bold text-yellow-400">{searchResult.distance.toFixed(2)} miles</span>
                      </p>
                      {searchResult.description && (
                        <p className="text-gray-400 text-sm mt-1">{searchResult.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 backdrop-blur-lg rounded-2xl border border-gray-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">No Results</h3>
                      <p className="text-gray-400">
                        {searchResult.message || "No targets found within search radius"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
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