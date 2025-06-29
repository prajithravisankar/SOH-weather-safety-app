import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { getDisasterData } from "../services/disasterService";
import { data } from "autoprefixer";

function MapView() {

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const [disasterData, setDisasterData] = useState(null);

    useEffect(() => {
        getDisasterData().then(data => {
            setDisasterData(data);
            console.log("Fetched disaster data: ", data);
        });
    }, []);

    return (
        <div className="h-96 w-full rounded-lg overflow-hidden">
            <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{height: '100%', width: '100%'}} zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <TileLayer
                    url={`https://tile.openweathermap.org/map/cloud_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                    opacity={0.8}
                    zIndex={1000}
                />      
                <Marker position={[37.7749, -122.4194]}>
                    <Popup>
                        San Francisco
                    </Popup>
                </Marker>
                <ZoomControl position="topright" />
            </MapContainer>
        </div>
    );
}

export default MapView;