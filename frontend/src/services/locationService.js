import axios from "axios";

export async function addLocation({ name, latitude, longitude, username }) {
    const payload = {
        name, 
        lat: parseFloat(latitude), 
        lon: parseFloat(longitude),
        username
    };
    const response = await axios.post("/api/locations", payload);
    return response.data;
}

export async function getLocations(username) {
    const response = await axios.get(`/api/locations?username=${username}`);
    return response.data;
}

export async function deleteLocation(id, username) {
    const response = await axios.delete(`/api/locations/${id}?username=${username}`);
    return response.data;
}