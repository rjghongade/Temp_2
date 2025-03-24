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
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-6">
      <div className="max-w-6xl mx-auto bg-gray-800 text-white shadow-2xl rounded-xl overflow-hidden">
        {/* Property Image & Info */}
        <div className="flex flex-col md:flex-row items-center gap-8 p-8">
          {/* Property Image */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={property.og_image || "default-image.jpg"}
              alt={property.property_name}
              className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-30"></div>
          </div>

          {/* Property Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-amber-400">{property.property_name}</h1>
            <p className="text-green-400 mt-2 text-lg">{property.sub_location}</p>
            <p className="text-2xl font-semibold text-amber-500 mt-3">₹{property.property_price} Cr</p>

            <div className="mt-4">
              <span className="inline-block bg-green-600 text-amber-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                {property.property_type}
              </span>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-6 border-b border-gray-600 pb-2">
              {["info", "description", "specifications", "map"].map((tab) => (
                <button
                  key={tab}
                  className={`text-lg font-semibold transition-all duration-300 pb-2 ${
                    activeTab === tab ? "text-amber-400 border-b-2 border-amber-400" : "text-green-400 hover:text-amber-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "info"
                    ? "Property Info"
                    : tab === "description"
                    ? "Description"
                    : tab === "specifications"
                    ? "Specifications"
                    : "Location Map"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-300">
              <p><strong className="text-amber-400">Builder:</strong> {property.builder_name}</p>
              <p><strong className="text-amber-400">Size Range:</strong> {property.property_price_range}</p>
              <p><strong className="text-amber-400">Type:</strong> {property.property_type_price_range}</p>
              <p><strong className="text-amber-400">Bedrooms:</strong> {property.property_bedroom || "N/A"}</p>
              <p><strong className="text-amber-400">Bathrooms:</strong> {property.property_bathroom || "N/A"}</p>
              <p><strong className="text-amber-400">Built Year:</strong> {property.property_built_year || "N/A"}</p>
              <p><strong className="text-amber-400">Garage:</strong> {property.property_garage || "N/A"}</p>
            </div>
          )}

          {activeTab === "description" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-amber-400">About the Property</h2>
              <div className="text-amber-300 mt-3 max-h-60 overflow-y-auto p-4 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: property.property_description }} />
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-amber-400">Property Specifications</h2>
              <div className="text-amber-100 mt-3 max-h-60 overflow-y-auto p-4 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: property.property_specification }} />
              </div>
            </div>
          )}

          {activeTab === "map" && property.property_map && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-amber-400">Property Location</h2>
              <div className="mt-4">
                <div dangerouslySetInnerHTML={{ __html: property.property_map }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
