import React, { useEffect, useState } from "react";
import config from '../../config'

const UnitLayouts = () => {
  const [layouts, setLayouts] = useState([]);
  const [heading, setHeading] = useState("Unit Layouts");
  const [selectedLayout, setSelectedLayout] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/unit-layout?website=${config.SLUG_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data?.page?.[0]?.heading || "Unit Layouts");
        setLayouts(data?.unit_layout || []);
      })
      .catch((error) => console.error("Error fetching unit layouts:", error));
  }, []);

  const closeModal = () => setSelectedLayout(null);
  const openModal = (layout) => setSelectedLayout(layout);

  return (
<section id="UnitLayouts" className="bg-gradient-to-br from-[#170505] via-[#312223] to-[#170505] py-12 px-5 text-[#5f7858]">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-[#d1b578] mb-6">
      {heading}
    </h2>

    {layouts.length === 0 ? (
      <p className="text-center text-[#d1b578] opacity-80">No unit layouts available.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {layouts.map((layout) => (
          <div
            key={layout.id}
            className="bg-[#5f7858] shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all hover:bg-[#d1b578]"
          >
            <img
              src={layout.layout_image?.replace("//uploads", "/uploads")}
              alt={layout.layout_name}
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#170505]">{layout.layout_name}</h3>
              <p className="text-sm text-[#d1b578] mt-1">
                {layout.unit_layout_heading}
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-[#d1b578]">
                  <strong>Carpet Area:</strong> {layout.unit_layout_carpet_area || "N/A"}
                </p>
                <p className="text-[#312223]">
                  <strong>Price:</strong> ₹{layout.unit_layout_price || "N/A"}
                </p>
              </div>
              <button
                onClick={() => openModal(layout)}
                className="mt-6 bg-gradient-to-r from-[#5f7858] to-[#d1b578] hover:from-[#d1b578] hover:to-[#5f7858] text-white text-sm font-medium px-6 py-3 rounded-lg w-full transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Modal */}
    {selectedLayout && (
      <div
        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        onClick={closeModal}
      >
        <div
          className="relative bg-[#5f7858] p-8 rounded-xl w-11/12 sm:w-3/4 md:w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-3 right-4 text-[#d1b578] text-2xl font-semibold"
          >
            &times;
          </button>

          <h3 className="text-3xl font-semibold text-[#170505] mb-4">
            {selectedLayout.layout_name}
          </h3>
          <img
            src={selectedLayout.layout_image?.replace("//uploads", "/uploads")}
            alt={selectedLayout.layout_name}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <p className="text-lg text-[#d1b578] mb-2">
            {selectedLayout.unit_layout_heading}
          </p>
          <p className="text-[#312223] mb-2">
            <strong>Carpet Area:</strong> {selectedLayout.unit_layout_carpet_area || "N/A"}
          </p>
          <p className="text-[#312223] mb-4">
            <strong>Price:</strong> ₹{selectedLayout.unit_layout_price || "N/A"}
          </p>

          <h4 className="text-xl font-semibold text-[#170505] mb-2">
            More Details:
          </h4>
          <p className="text-[#312223]">
            More information about the unit layout.
          </p>
        </div>
      </div>
    )}
  </div>
</section>

  );
};

export default UnitLayouts;
