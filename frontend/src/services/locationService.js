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