import { useEffect, useState } from "react";
import config from "../../config";

const AmenitiesSection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/amenities?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch amenities");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center py-6 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-6 text-gray-400 text-lg">Loading...</div>;
  }

  return (
<section id="AmenitiesSection" className="w-full py-16 bg-gradient-to-br from-[#170505] via-[#312223] to-[#170505] text-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold text-[#d1b578] mb-6">
      {data.amenities.page.heading}
    </h2>
    
    {data.amenities.page.subheading && (
      <p className="text-lg text-[#d1b578] opacity-80 mb-12">{data.amenities.page.subheading}</p>
    )}

    {/* Amenities Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {data.amenities.amenities.map((amenity) => (
        <div
          key={amenity.id}
          className="bg-[#5f7858] p-6 rounded-xl shadow-lg flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:bg-[#d1b578]"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#d1b578] mb-4 shadow-md">
            <img
              src={amenity.property_amenities_photo}
              alt={amenity.amenity_name}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-xl font-semibold text-[#170505] mb-2">{amenity.amenity_name}</h3>
          <p className="text-[#312223] text-sm">Updated: {new Date(amenity.updated_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default AmenitiesSection;
