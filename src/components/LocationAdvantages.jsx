import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const LocationAdvantages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/location-advantages?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const locationAdvantages = data?.location_advantages || [];
  const heading = data?.page?.[0]?.heading || "Location Highlights";

  const extendedLocations = useMemo(() => {
    if (locationAdvantages.length === 0) return [];
    return [
      locationAdvantages[locationAdvantages.length - 1],
      ...locationAdvantages,
      locationAdvantages[0],
    ];
  }, [locationAdvantages]);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(extendedLocations.length - 2);
      setTimeout(() => setTransitionEnabled(true), 50);
    } else if (currentIndex === extendedLocations.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
      setTimeout(() => setTransitionEnabled(true), 50);
    }
  };

  return (
    <div className="bg-[#170505] py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-amber-500 mb-6">{heading}</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevSlide} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg">
              <ChevronRight size={24} />
            </button>
          </div>
          <div
            className={`flex transition-transform duration-500 ${!transitionEnabled ? "transition-none" : ""}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedLocations.map((item, index) => (
              <div key={index} className="flex-none w-full md:w-1/3 px-3">
                <div className="bg-[#5f7858] rounded-full p-6 border border-gray-700 hover:border-amber-500 shadow-xl flex flex-col items-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-black/80 rounded-full shadow-md mb-4">
                    <MapPin size={30} className="text-amber-400" />
                  </div>
                  <h4 className="text-lg font-bold text-[#312223]">{item.location}</h4>
                  <p className="text-gray-400 text-sm">{item.distance}</p>
                  <p className="text-gray-300 text-center mt-2">{item.description}</p>
                  <a href="#" className="text-amber-400 flex items-center mt-4 hover:underline">
                    View on map <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {locationAdvantages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index + 1)}
              className={`h-3 w-3 mx-1 rounded-full transition-all ${currentIndex - 1 === index ? "bg-amber-500 scale-125" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </div>
      <ContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default LocationAdvantages;