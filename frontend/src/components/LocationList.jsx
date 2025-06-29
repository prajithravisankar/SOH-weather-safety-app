import { useEffect, useState } from "react";
import { getLocations, deleteLocation } from "../services/locationService";

function LocationList({ locations, setMapCenter, onLocationUpdate }) {
  const [isDeleting, setIsDeleting] = useState(null);

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await deleteLocation(id);
      // Trigger refresh of locations
      if (onLocationUpdate) {
        const updatedLocations = await getLocations();
        onLocationUpdate(updatedLocations);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
        {locations.length === 0 ? (
          <div className="text-gray-400 text-center py-4">No locations added yet.</div>
        ) : (
          locations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center justify-between gap-2 text-white bg-[#1a1a1a] rounded px-3 py-2 shadow hover:bg-[#333] transition-colors border border-[#333]"
            >
              <div 
                className="flex items-center gap-2 cursor-pointer flex-1"
                onClick={() => setMapCenter([loc.lat, loc.lon])}
              >
                <span className="text-lg">🏠</span>
                <div>
                  <div className="font-medium">{loc.name}</div>
                  <div className="text-sm text-gray-400">({loc.lat.toFixed(3)}, {loc.lon.toFixed(3)})</div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(loc.id);
                }}
                disabled={isDeleting === loc.id}
                className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-900/20 transition-colors disabled:opacity-50"
                title="Delete location"
              >
                {isDeleting === loc.id ? "..." : "🗑️"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LocationList;