import React, { useState, useEffect } from "react";
import {
  MapPin,
  MapIcon,
  Building,
  Clock,
  Navigation,
  Car,
  Plane,
  Train,
  Briefcase,
  Home,
  School,
  ShoppingBag,
  Coffee,
  Loader,
} from "lucide-react";
import config from "../../config";

const Location = () => {
  const [locationData, setLocationData] = useState({
    heading: "",
    subheading: null,
    map: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-map?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();
        setLocationData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const renderMap = () => {
    return { __html: locationData.map };
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8">
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400">
          <p>Failed to load location data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-8" id="Location">
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-3">
          <MapIcon size={28} className="text-amber-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-500">
            {locationData.heading || "Prime Location"}
          </h2>
        </div>
        {locationData.subheading && (
          <p className="text-amber-300 text-center max-w-2xl">
            {locationData.subheading}
          </p>
        )}
        <div className="w-24 sm:w-32 h-1 bg-amber-600 mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="bg-gray-800/60 rounded-lg overflow-hidden shadow-lg border border-gray-800 w-full h-64 md:h-96">
            {locationData.map ? (
              <div
                dangerouslySetInnerHTML={renderMap()}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                <MapIcon size={48} />
                <p className="ml-2">Map not available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
