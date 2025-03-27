import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import config from "../../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/gallary?website=${config.SLUG_URL}`);

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }

        const data = await response.json();
        setImages(data.property_photos || []);
        setHeading(data.page[0]?.heading || "Property Gallery");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToNextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToPrevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
<div className="bg-gradient-to-br from-[#170505] via-[#312223] to-black p-8" id="Gallery">
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-bold text-[#d1b578] mb-2">
      {heading}
    </h2>
    <div className="w-24 h-1 bg-[#d1b578] mx-auto rounded-full"></div>
    <p className="text-[#5f7858] mt-4">Explore the stunning views of Ceratec Tower 1o8</p>
  </div>

  {loading ? (
    <p className="text-center text-[#d1b578]">Loading gallery...</p>
  ) : error ? (
    <p className="text-center text-red-400">Error: {error}</p>
  ) : (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
      effect="coverflow"
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-10"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => openLightbox(image, index)}
          >
            <img
              src={image.photo}
              alt="Gallery"
              className="w-full h-64 object-cover transition-all duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera size={24} className="text-[#d1b578]" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )}

  {/* Lightbox */}
  {selectedImage && (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-center items-center p-4">
      <button
        className="absolute top-4 right-4 text-white hover:text-[#5f7858] p-2 rounded-full bg-[#312223]/60 transition-colors duration-300"
        onClick={closeLightbox}
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-4xl max-h-[80vh] flex justify-center items-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#312223]/60 p-2 rounded-full text-white hover:bg-[#5f7858] transition-colors duration-300 z-10"
          onClick={goToPrevImage}
        >
          <ChevronLeft size={24} />
        </button>

        <img
          src={selectedImage.photo}
          alt="Enlarged view"
          className="max-h-[80vh] max-w-full object-contain rounded-lg transition-all duration-300 ease-in-out"
        />

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#312223]/60 p-2 rounded-full text-white hover:bg-[#5f7858] transition-colors duration-300 z-10"
          onClick={goToNextImage}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default Gallery;
