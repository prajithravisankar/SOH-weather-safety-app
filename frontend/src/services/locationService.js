import axios from "axios";


export async function addLocation({ name, latitude, longitude }) {
    const payload = {
        name, 
        lat: parseFloat(latitude), 
        lon: parseFloat(longitude)
    };
    const response = await axios.post("/api/locations", payload);
    return response.data;
}

export async function getLocations() {
    const response = await axios.get("/api/locations");
    return response.data;
}

export async function deleteLocation(id) {
    const response = await axios.delete(`/api/locations/${id}`);
    return response.data;
}