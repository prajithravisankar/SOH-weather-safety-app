import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'leaflet/dist/leaflet.css';
import MapView from './components/MapView';
import LocationForm from './components/LocationForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Weather Safety App</h1>
      <MapView />
      <LocationForm />
    </div>
  );
}

export default App;
