import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, Tooltip, Circle, Polyline } from "react-leaflet";
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

function MapView({ mapCenter, locations, onLocationUpdate, onMarkerClick, selectedMarker, searchInProgress, onSearchComplete, searchResult }) {

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const [disasterData, setDisasterData] = useState(null);
    const [searchRadius, setSearchRadius] = useState(0);
    const [animationActive, setAnimationActive] = useState(false);

    useEffect(() => {
        getDisasterData().then(data => {
            setDisasterData(data);
            console.log("Fetched disaster data: ", data);
        });
    }, []);

    // Handle radial search animation
    useEffect(() => {
        if (searchInProgress && selectedMarker) {
            setAnimationActive(true);
            setSearchRadius(0);
            
            const radii = [1, 5, 10, 25, 50, 100, 200]; // miles
            let currentRadiusIndex = 0;
            
            const animateSearch = () => {
                if (currentRadiusIndex < radii.length) {
                    const currentRadius = radii[currentRadiusIndex];
                    setSearchRadius(currentRadius);
                    
                    // Check if we found a target within this radius
                    const result = findNearestTarget(selectedMarker, currentRadius);
                    
                    if (result) {
                        setTimeout(() => {
                            setAnimationActive(false);
                            onSearchComplete(result);
                        }, 1000);
                        return;
                    }
                    
                    currentRadiusIndex++;
                    setTimeout(animateSearch, 800); // 800ms between each radius expansion
                } else {
                    // No target found within max radius
                    const noResult = { message: "No targets found within 200 miles" };
                    setTimeout(() => {
                        setAnimationActive(false);
                        onSearchComplete(noResult);
                    }, 1000);
                }
            };
            
            setTimeout(animateSearch, 500); // Start after 500ms
        }
    }, [searchInProgress, selectedMarker, locations, disasterData]);

    // Calculate distance between two points (Haversine formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 3959; // Earth's radius in miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    // Find nearest target within radius
    const findNearestTarget = (marker, radiusMiles) => {
        const targets = marker.type === 'disaster' ? locations : 
                       (disasterData?.events || []).flatMap(event => 
                           event.geometry.filter(g => g.type === "Point")
                               .map(g => ({ 
                                   lat: g.coordinates[1], 
                                   lon: g.coordinates[0], 
                                   title: event.title, 
                                   type: 'disaster',
                                   description: event.description 
                               }))
                       );

        let nearest = null;
        let minDistance = Infinity;

        targets.forEach(target => {
            const distance = calculateDistance(
                marker.lat, 
                marker.lon,
                target.lat, 
                target.lon
            );
            
            if (distance <= radiusMiles && distance < minDistance) {
                minDistance = distance;
                nearest = { ...target, distance };
            }
        });

        return nearest;
    };

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
                        eventHandlers={{
                            click: () => onMarkerClick({...location, lat: location.lat, lon: location.lon}, 'location')
                        }}
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
                        eventHandlers={{
                            click: () => onMarkerClick({
                                lat: g.coordinates[1], 
                                lon: g.coordinates[0], 
                                title: event.title,
                                description: event.description
                            }, 'disaster')
                        }}
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

                {/* Radial Search Animation */}
                {animationActive && selectedMarker && (
                    <Circle
                        center={[selectedMarker.lat, selectedMarker.lon]}
                        radius={searchRadius * 1609.34} // Convert miles to meters
                        pathOptions={{
                            color: selectedMarker.type === 'disaster' ? '#ef4444' : '#3b82f6',
                            fillColor: selectedMarker.type === 'disaster' ? '#ef4444' : '#3b82f6',
                            fillOpacity: 0.1,
                            weight: 3,
                            opacity: 0.7
                        }}
                    />
                )}

                {/* Connection Line and Result */}
                {searchResult && (searchResult.title || searchResult.name) && selectedMarker && (
                    <>
                        <Polyline
                            positions={[
                                [selectedMarker.lat, selectedMarker.lon],
                                [searchResult.lat, searchResult.lon]
                            ]}
                            pathOptions={{
                                color: '#fbbf24',
                                weight: 4,
                                opacity: 0.8,
                                dashArray: '10, 10'
                            }}
                        />
                        <Marker
                            position={[searchResult.lat, searchResult.lon]}
                            icon={selectedMarker.type === 'disaster' ? userLocationIcon : disasterIcon}
                        >
                            <Tooltip permanent={true} direction="top" offset={[0, -20]}>
                                <strong>🎯 NEAREST MATCH</strong><br />
                                <strong>{searchResult.title || searchResult.name}</strong><br />
                                <em>Distance: {searchResult.distance.toFixed(2)} miles</em>
                            </Tooltip>
                        </Marker>
                    </>
                )}

                <ZoomControl position="topright" />
            </MapContainer>
        </div>
    );
}

export default MapView;