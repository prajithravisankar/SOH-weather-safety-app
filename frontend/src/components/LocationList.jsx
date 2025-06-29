import { useEffect, useState } from "react";
import { getLocations, deleteLocation } from "../services/locationService";

function LocationList({ locations, setMapCenter, onLocationUpdate, username }) {
  const [isDeleting, setIsDeleting] = useState(null);

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await deleteLocation(id, username);
      // Trigger refresh of locations
      if (onLocationUpdate) {
        const updatedLocations = await getLocations(username);
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
      <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
        {locations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📍</div>
            <div className="text-gray-400 text-lg mb-2">No locations yet</div>
            <div className="text-gray-500 text-sm">Add your first important location below</div>
          </div>
        ) : (
          locations.map((loc) => (
            <div
              key={loc.id}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => setMapCenter([loc.lat, loc.lon])}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg mb-1">{loc.name}</div>
                    <div className="text-gray-400 text-sm">
                      {loc.lat.toFixed(4)}, {loc.lon.toFixed(4)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(loc.id);
                  }}
                  disabled={isDeleting === loc.id}
                  className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  title="Delete location"
                >
                  {isDeleting === loc.id ? "..." : "🗑️"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LocationList;