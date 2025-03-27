import { useEffect, useState } from "react";
import config from "../../config";

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    fetch(`${config.API_URL}/propert-details?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => setProperty(data.property_details))
      .catch((error) => console.error("Error fetching property details:", error));
  }, []);

  if (!property) {
    return <p className="text-center text-gray-500">Loading property details...</p>;
  }

  return (
<section id="PropertiInfo" className="bg-gradient-to-b from-[#312223] to-[#170505] py-12 px-4 sm:px-6 md:px-8">
  <div className="max-w-6xl mx-auto bg-[#5f7858] text-white shadow-2xl rounded-xl overflow-hidden">
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 sm:p-8">
      <div className="w-full md:w-1/2 relative">
        <img
          src={property.og_image || "default-image.jpg"}
          alt={property.property_name}
          className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d1b578]">{property.property_name}</h1>
        <p className="text-[#312223] mt-2 text-lg">{property.sub_location}</p>
        {/* <p className="text-xl sm:text-2xl font-semibold text-[#d1b578] mt-3">₹{property.property_price} Cr</p> */}

        <div className="mt-4">
          <span className="inline-block bg-[#312223] text-[#d1b578] px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
            {property.property_type}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 border-b border-[#312223] pb-2">
          {["info", "description", "specifications", "map"].map((tab) => (
            <button
              key={tab}
              className={`text-base sm:text-lg font-semibold transition-all duration-300 pb-2 ${
                activeTab === tab ? "text-[#d1b578] border-b-2 border-[#d1b578]" : "text-[#312223] hover:text-[#d1b578]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "info"
                ? "Property Info"
                : tab === "description"
                ? "Description"
                : tab === "specifications"
                ? "About Builder"
                : ""}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="p-6">
      {activeTab === "info" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#d1b578]">
          <p><strong className="text-[#312223]">Builder:</strong> {property.builder_name}</p>
          <p><strong className="text-[#312223]">Size Range:</strong> {property.property_price_range}</p>
          <p><strong className="text-[#312223]">Type:</strong> {property.property_type_price_range}</p>
          <p><strong className="text-[#312223]">Bedrooms:</strong> {property.property_bedroom || "N/A"}</p>
          <p><strong className="text-[#312223]">Bathrooms:</strong> {property.property_bathroom || "N/A"}</p>
          <p><strong className="text-[#312223]">Built Year:</strong> {property.property_built_year || "N/A"}</p>
          <p><strong className="text-[#312223]">Garage:</strong> {property.property_garage || "N/A"}</p>
        </div>
      )}

      {activeTab === "description" && (
        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#d1b578]">About the Property</h2>
          <div className="text-[#d1b578] mt-3 max-h-60 overflow-y-auto p-4 bg-[#170505] bg-opacity-50 border border-[#312223] rounded-lg shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: property.property_description }} />
          </div>
        </div>
      )}

      {activeTab === "specifications" && (
        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#d1b578]">About Builder</h2>
          <div className="text-[#d1b578] mt-3 max-h-60 overflow-y-auto p-4 bg-[#170505] bg-opacity-50 border border-[#312223] rounded-lg shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: property.property_specification }} />
          </div>
        </div>
      )}

    </div>
  </div>
</section>

  );
};

export default PropertyDetails;
