import axios from "axios";

export async function getDisasterData() {
    try {
        const response = await axios.get("/api/disasters");
        return response.data;
    } catch (error) {
        console.error("error fetching disaster data: ", error);
        return null;
    }
}