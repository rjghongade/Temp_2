import React, { useEffect, useState } from "react";
import config from '../../config'

const FloorPlans = () => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [heading, setHeading] = useState("Floor Plans");

  useEffect(() => {
    const apiUrl = `${config.API_URL}/floor-layout?website=${config.SLUG_URL}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setHeading(data.page?.[0]?.heading || "Floor Plans");
        setFloorPlans(data.Floor_plans || []);
      })
      .catch((error) => console.error("Error fetching floor plans:", error));
  }, []);

  return (
    <section id="FloorPlans" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-amber-400 mb-10">{heading}</h2>

        {floorPlans.length === 0 ? (
          <p className="text-center text-gray-400">No floor plans available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {floorPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={plan.layout_image}
                  alt={plan.layout_name}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-green-400">{plan.layout_name}</h3>

                  {plan.unit_layout_heading && (
                    <p className="text-gray-400 mt-2">
                      <strong className="text-white">Heading:</strong> {plan.unit_layout_heading}
                    </p>
                  )}

                  {plan.unit_layout_carpet_area && (
                    <p className="text-gray-400 mt-2">
                      <strong className="text-white">Carpet Area:</strong> {plan.unit_layout_carpet_area}
                    </p>
                  )}

                  {plan.unit_layout_price && (
                    <p className="text-gray-400 mt-2">
                      <strong className="text-white">Price:</strong> {plan.unit_layout_price}
                    </p>
                  )}

                  {plan.unit_layout_description && (
                    <p className="text-gray-400 mt-2">
                      <strong className="text-white">Description:</strong> {plan.unit_layout_description}
                    </p>
                  )}

                  <p className="text-green-500 text-sm mt-4">
                    <strong className="text-amber-400">Updated At:</strong> {new Date(plan.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FloorPlans;
