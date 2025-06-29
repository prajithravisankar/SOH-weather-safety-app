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

function LocationForm({ onLocationAdded, username }) {
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
            await addLocation({ ...formData, username });
            setStatus("location added!");
            setFormData({ name: "", latitude: "", longitude: "" });
            if (onLocationAdded) onLocationAdded();
        } catch (error) {
            setStatus("Error adding location");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto"
        >
            {/* Inputs row - All in one row on larger screens */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col flex-1">
                    <label htmlFor="name" className="text-sm font-medium text-white mb-3">
                        Location Name
                    </label>
                    <input
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Home, Work, Mom's House"
                        required
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="latitude" className="text-sm font-medium text-white mb-3">
                        Latitude
                    </label>
                    <input
                        name="latitude"
                        id="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="40.7128"
                        required
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="longitude" className="text-sm font-medium text-white mb-3">
                        Longitude
                    </label>
                    <input
                        name="longitude"
                        id="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="-74.0060"
                        required
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                <div className="flex flex-col justify-end">
                    <button
                        type="submit"
                        className="h-14 px-8 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 whitespace-nowrap"
                    >
                        Add Location
                    </button>
                </div>
            </div>
            {/* Status message */}
            {status && (
                <div className="text-center mt-6">
                    <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                        status.includes('added') 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                        {status}
                    </div>
                </div>
            )}
        </form>
    );
}

export default LocationForm;