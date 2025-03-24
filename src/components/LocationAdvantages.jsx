import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Loader,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { ContactDialog } from "./Contact";
import config from "../../config";

const LocationAdvantages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
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

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const transformValue = `translateX(-${(currentIndex * 100) / visibleCount}%)`;

  return (
    <div className="bg-gray-900 p-10">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader size={30} className="text-amber-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-amber-400 text-center">Failed to load location data: {error}</div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-amber-600 mb-3">{heading}</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-300">
              Explore <span className="text-amber-400">Nearby Landmarks</span>
            </h3>
            <div className="flex gap-3">
              <button onClick={prevSlide} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg transition-transform hover:scale-110">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg transition-transform hover:scale-110">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Location Cards Carousel */}
          <div className="relative w-full overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ${!transitionEnabled ? "transition-none" : ""}`}
              style={{ transform: transformValue }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedLocations.map((item, index) => (
                <div key={index} className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3">
                  <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700 hover:border-amber-500 shadow-lg backdrop-blur-lg transition-all transform hover:-translate-y-2 hover:shadow-amber-500/50 flex flex-col h-full">
                    {/* Icon & Heading */}
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-black/80 rounded-xl shadow-md">
                        <MapPin size={26} className="text-amber-400" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-green-700">{item.location}</h4>
                        <p className="text-gray-400 text-sm">{item.distance}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 flex-grow">{item.description}</p>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <a href="#" className="text-amber-400 flex items-center hover:underline hover:text-amber-300 transition-all">
                        View on map <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
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
      )}
      <ContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default LocationAdvantages;
