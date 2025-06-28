import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

function MapView() {
    return (
        <div className="h-96 w-full rounded-lg overflow-hidden">
            <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{height: '100%', width: '100%'}} zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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