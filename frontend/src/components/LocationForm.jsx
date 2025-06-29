import { useState, useEffect } from "react";
import { addLocation } from "../services/locationService";

// validate function
const validate = ({ name, latitude, longitude}) => {
    if (!name || !latitude || !longitude) return "All fields are required";
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || lat < -90 || lat > 90) return "latitude must be between -90 and 90";
    if (isNaN(lon) || lon < -180 || lon > 180) return "longitude must be between -180 and 180.";
    return null;
}

function LocationForm({ onLocationAdded }) {
    const [formData, setFormData] = useState({ name: "", latitude: "", longitude: ""});
    const [status, setStatus] = useState("");

    useEffect(() => {
      if (status) {
        const timer = setTimeout(() => setStatus(""), 5000);
        return () => clearTimeout(timer);
      }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        const error = validate(formData);
        if (error) {
            setStatus(error);
            return;
        }
        try {
            await addLocation(formData);
            setStatus("location added!");
            setFormData({ name: "", latitude: "", longitude: "" });
            // Trigger parent component to refresh locations
            if (onLocationAdded) {
                onLocationAdded();
            }
        } catch (error) {
            setStatus("Error adding location");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-4 bg-[#242424] rounded-lg shadow border border-[#333]"
        >
            {/* Inputs row - All in one row on larger screens */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <label htmlFor="name" className="text-xs font-medium text-white mb-1">
                    Name
                    </label>
                    <input
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Location Name"
                    required
                    className="rounded-md border border-[#333] bg-[#1a1a1a] text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="latitude" className="text-xs font-medium text-white mb-1">
                    Latitude
                    </label>
                    <input
                    name="latitude"
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    required
                    className="rounded-md border border-[#333] bg-[#1a1a1a] text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="longitude" className="text-xs font-medium text-white mb-1">
                    Longitude
                    </label>
                    <input
                    name="longitude"
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    required
                    className="rounded-md border border-[#333] bg-[#1a1a1a] text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex flex-col justify-end">
                    <button
                        type="submit"
                        className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 whitespace-nowrap"
                        style={{ backgroundColor: "#646cff" }}
                    >
                        Add Location
                    </button>
                </div>
            </div>
            {/* Status message */}
            {status && (
                <div className="text-sm text-red-400 mt-2 text-center">{status}</div>
            )}
        </form>
    );
}

export default LocationForm;