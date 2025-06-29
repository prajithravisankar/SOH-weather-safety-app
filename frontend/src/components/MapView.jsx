import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { getDisasterData } from "../services/disasterService.js";
import L from 'leaflet';

// Component to handle map center changes
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom || map.getZoom());
        }
    }, [center, zoom, map]);
    return null;
}

function MapView({ mapCenter, locations, onLocationUpdate }) {

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const [disasterData, setDisasterData] = useState(null);

    useEffect(() => {
        getDisasterData().then(data => {
            setDisasterData(data);
            console.log("Fetched disaster data: ", data);
        });
    }, []);

    // Note: Location fetching is now handled entirely by the App component
    // The MapView component only displays the locations passed as props

    // Create custom icon for user locations (green for safety/home)
    const userLocationIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Create custom icon for disaster events (red for danger)
    const disasterIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <div className="h-96 w-full rounded-lg overflow-hidden">
            <MapContainer 
                center={mapCenter || [37.7749, -122.4194]} 
                zoom={10} 
                style={{height: '100%', width: '100%'}} 
                zoomControl={false}
            >
                <ChangeView center={mapCenter} zoom={12} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <TileLayer
                    url={`https://tile.openweathermap.org/map/cloud_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                    opacity={0.8}
                    zIndex={1000}
                />      
                
                {/* User Location Markers */}
                {locations && locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.lat, location.lon]}
                        icon={userLocationIcon}
                    >
                        <Tooltip permanent={false} direction="top" offset={[0, -20]}>
                            <strong>🏠 {location.name}</strong><br />
                            <em>Your saved location</em><br />
                            Coordinates: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                        </Tooltip>
                    </Marker>
                ))}

                {/* Disaster Event Markers */}
                {disasterData && disasterData.events && disasterData.events.flatMap((event) =>
                event.geometry
                    .filter(g => g.type === "Point")
                    .map((g, idx) => (
                    <Marker
                        key={event.id + idx}
                        position={[g.coordinates[1], g.coordinates[0]]}
                        icon={disasterIcon}
                    >
                        <Tooltip permanent={false} direction="top" offset={[0, -20]}>
                            <strong>🚨 {event.title}</strong><br />
                            {event.description}<br />
                            <em>Category: {event.categories[0]?.title}</em><br />
                            <em>Date: {new Date(g.date).toLocaleString()}</em>
                        </Tooltip>
                    </Marker>
                    ))
                )}
                <ZoomControl position="topright" />
            </MapContainer>
        </div>
    );
}

export default MapView;