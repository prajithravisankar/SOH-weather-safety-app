import { useState, useEffect } from "react";
import { addLocation } from "../services/locationService";

// Common place types with emojis
const PLACE_TYPES = [
    { value: 'home', label: 'Home', emoji: '🏠' },
    { value: 'work', label: 'Work/Office', emoji: '🏢' },
    { value: 'school', label: 'School', emoji: '🏫' },
    { value: 'college', label: 'College', emoji: '🎓' },
    { value: 'university', label: 'University', emoji: '🏛️' },
    { value: 'hospital', label: 'Hospital', emoji: '🏥' },
    { value: 'shopping', label: 'Shopping Center', emoji: '🛒' },
    { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
    { value: 'gym', label: 'Gym/Fitness', emoji: '💪' },
    { value: 'bank', label: 'Bank', emoji: '🏦' },
    { value: 'library', label: 'Library', emoji: '📚' },
    { value: 'park', label: 'Park', emoji: '🌳' },
    { value: 'church', label: 'Church/Religious', emoji: '⛪' },
    { value: 'airport', label: 'Airport', emoji: '✈️' },
    { value: 'hotel', label: 'Hotel', emoji: '🏨' },
    { value: 'pharmacy', label: 'Pharmacy', emoji: '💊' },
    { value: 'gas_station', label: 'Gas Station', emoji: '⛽' },
    { value: 'family', label: 'Family/Friends', emoji: '👨‍👩‍👧‍👦' },
    { value: 'emergency', label: 'Emergency Contact', emoji: '🚨' },
    { value: 'other', label: 'Other', emoji: '📍' }
];

// Geocoding function to convert address to coordinates
const geocodeAddress = async (address) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        );
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                displayName: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};

// Enhanced validation function
const validate = ({ name, latitude, longitude, memberName, placeType, phone }) => {
    if (!name || !memberName || !placeType) return "Name, member name, and place type are required";
    
    if (!latitude || !longitude) return "Location coordinates are required";
    
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || lat < -90 || lat > 90) return "Latitude must be between -90 and 90";
    if (isNaN(lon) || lon < -180 || lon > 180) return "Longitude must be between -180 and 180";
    
    if (phone && !/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        return "Please enter a valid phone number";
    }
    
    return null;
};

function LocationForm({ onLocationAdded, username }) {
    const [formData, setFormData] = useState({ 
        name: "", 
        latitude: "", 
        longitude: "",
        memberName: "",
        placeType: "",
        address: "",
        phone: ""
    });
    const [status, setStatus] = useState("");
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState([]);

    useEffect(() => {
      if (status) {
        const timer = setTimeout(() => setStatus(""), 5000);
        return () => clearTimeout(timer);
      }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear address suggestions when typing in other fields
        if (name !== 'address') {
            setAddressSuggestions([]);
        }
    };

    // Handle address input with debounced geocoding
    const handleAddressChange = async (e) => {
        const address = e.target.value;
        setFormData({ ...formData, address });
        
        if (address.length > 3) {
            setIsGeocoding(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5`
                );
                const suggestions = await response.json();
                setAddressSuggestions(suggestions || []);
            } catch (error) {
                console.error('Address search error:', error);
                setAddressSuggestions([]);
            }
            setIsGeocoding(false);
        } else {
            setAddressSuggestions([]);
        }
    };

    const selectAddressSuggestion = (suggestion) => {
        setFormData({
            ...formData,
            address: suggestion.display_name,
            latitude: suggestion.lat,
            longitude: suggestion.lon
        });
        setAddressSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        
        // If address is provided but no coordinates, try to geocode
        if (formData.address && (!formData.latitude || !formData.longitude)) {
            setIsGeocoding(true);
            const result = await geocodeAddress(formData.address);
            if (result) {
                setFormData({
                    ...formData,
                    latitude: result.lat.toString(),
                    longitude: result.lng.toString()
                });
                setIsGeocoding(false);
                return; // Let user review coordinates before submitting
            } else {
                setStatus("Could not find coordinates for this address. Please enter manually.");
                setIsGeocoding(false);
                return;
            }
        }
        
        const error = validate(formData);
        if (error) {
            setStatus(error);
            return;
        }
        
        try {
            const selectedPlaceType = PLACE_TYPES.find(type => type.value === formData.placeType);
            const locationData = {
                ...formData,
                username,
                emoji: selectedPlaceType?.emoji || '📍'
            };
            
            await addLocation(locationData);
            setStatus("Location added successfully!");
            setFormData({ 
                name: "", 
                latitude: "", 
                longitude: "",
                memberName: "",
                placeType: "",
                address: "",
                phone: ""
            });
            if (onLocationAdded) onLocationAdded();
        } catch (error) {
            setStatus("Error adding location");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6">
            {/* First Row: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="memberName" className="text-sm font-medium text-white mb-3">
                        Member Name *
                    </label>
                    <input
                        name="memberName"
                        id="memberName"
                        value={formData.memberName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-white mb-3">
                        Location Name *
                    </label>
                    <input
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., John's Home, Office Building"
                        required
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="placeType" className="text-sm font-medium text-white mb-3">
                        Place Type *
                    </label>
                    <select
                        name="placeType"
                        id="placeType"
                        value={formData.placeType}
                        onChange={handleChange}
                        required
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
                    >
                        <option value="">Select place type...</option>
                        {PLACE_TYPES.map(type => (
                            <option key={type.value} value={type.value} className="bg-slate-800 text-white">
                                {type.emoji} {type.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Second Row: Address and Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col relative">
                    <label htmlFor="address" className="text-sm font-medium text-white mb-3">
                        Address
                    </label>
                    <input
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleAddressChange}
                        placeholder="Start typing address... (optional - coordinates will auto-fill)"
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                    
                    {/* Address Suggestions */}
                    {addressSuggestions.length > 0 && (
                        <div className="address-suggestions absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-white/20 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                            {addressSuggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectAddressSuggestion(suggestion)}
                                    className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 text-white text-sm"
                                >
                                    📍 {suggestion.display_name}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {isGeocoding && (
                        <div className="absolute right-3 top-14 transform -translate-y-1/2">
                            <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium text-white mb-3">
                        Phone Number
                    </label>
                    <input
                        name="phone"
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Third Row: Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="latitude" className="text-sm font-medium text-white mb-3">
                        Latitude *
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
                
                <div className="flex flex-col">
                    <label htmlFor="longitude" className="text-sm font-medium text-white mb-3">
                        Longitude *
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
                        disabled={isGeocoding}
                        className="h-14 px-8 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isGeocoding ? "Finding Location..." : "Add Location"}
                    </button>
                </div>
            </div>
            
            {/* Helper Text */}
            <div className="text-center text-gray-400 text-sm">
                💡 Start typing an address to auto-fill coordinates, or enter latitude/longitude manually
            </div>
            
            {/* Status message */}
            {status && (
                <div className="text-center mt-6">
                    <div className={`inline-block px-6 py-3 rounded-xl text-sm font-medium ${
                        status.includes('successfully') 
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