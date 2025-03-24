import { useEffect, useState } from 'react';
import { FaRupeeSign, FaBuilding, FaRulerCombined, FaChevronRight } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import config from '../../config';

const PropertyPrices = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/property-prices?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch property prices');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 bg-gradient-to-br from-slate-900 to-gray-900">
        <Loader size={30} className="text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400 bg-gradient-to-br from-slate-900 to-gray-900">
        Error loading property prices: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-400 bg-gradient-to-br from-slate-900 to-gray-900">
        No property data available
      </div>
    );
  }

  return (
    <section className="relative w-full py-16 text-white overflow-hidden bg-gradient-to-br from-slate-900 to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-800/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-700/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-amber-600/10 rounded-full blur-2xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-amber-500 mb-4">
            {data?.page?.[0]?.heading || 'Premium Property Collection'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-amber-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our exclusive selection of properties with premium amenities and strategic locations
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.property_prices?.map((property) => (
            <div
              key={property.id}
              className="relative group"
            >
              {/* Card background with gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-amber-600 rounded-2xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              
              <div className="relative bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700/50 hover:translate-y-[-4px] transform transition-all duration-300 ease-in-out h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-green-500">
                    {property.property_type}
                  </h3>
                  <div className="bg-indigo-500/20 p-2 rounded-full">
                    <FaBuilding className="text-indigo-400" />
                  </div>
                </div>
                
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center text-amber-300">
                    <div className="w-6 flex justify-center text-indigo-400 mr-2">
                      <FaChevronRight size={12} />
                    </div>
                    <span>Tower: {property.property_tower}</span>
                  </div>
                  
                  <div className="flex items-start text-green-300">
                    <div className="w-6 flex justify-center text-indigo-400 mr-2 mt-1">
                      <FaRulerCombined size={14} />
                    </div>
                    <div>
                      <p>Carpet Area:</p>
                      <p className="text-green-400">
                        {property.property_carpet_sqft} {property.carpet_unit_sqft} / {property.property_carpet_sqm?.toFixed(2)} {property.carpet_unit_sqm}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-green-400">
                    <FaRupeeSign className="mr-1" /> 
                    <span>{property.property_price} {property.price_unit}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{property.price_tag} Price</p>
                </div>
                
                <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                  Premium
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyPrices;