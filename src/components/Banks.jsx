import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Building,
  ExternalLink,
  Loader,
  AlertTriangle,
  CreditCard,
} from "lucide-react";
import config from "../../config";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/banks?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banks data");
        }

        const data = await response.json();
        setBanks(data.bank.banks);
        setHeading(data.bank.page.heading);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8">
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400 flex items-center gap-3">
          <AlertTriangle size={20} />
          <p>Failed to load banks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="BanksSection" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-amber-400 mb-2">
          {heading || "Approved Home Loan Partners"}
        </h2>
        <p className="text-green-200 max-w-2xl mx-auto">
          Choose from our network of trusted banking partners for hassle-free
          home loan approvals
        </p>
        <div className="w-24 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="pb-10"
      >
        {banks.map((bank) => (
          <SwiperSlide key={bank.id}>
            <a
              href={bank.bank_slug}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gray-800/60 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-600/10 h-full flex flex-col">
                <div className="relative h-40 bg-black/80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
                  {bank.property_bank_photo ? (
                    <img
                      src={bank.property_bank_photo}
                      alt={bank.bank_name}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building size={64} className="text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-amber-200 font-medium text-lg mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {bank.bank_name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    <span className="text-sm flex items-center">
                      <CreditCard size={16} className="mr-2" />
                      Home Loan Partner
                    </span>
                    <ExternalLink
                      size={16}
                      className="opacity-70 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banks;
