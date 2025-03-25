import React, { useState, useEffect } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  ChevronUp,
  AlertTriangle,
  Loader,
} from "lucide-react";
import config from "../../config";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/footer?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();
        setFooterData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getSocialIcon = (iconName) => {
    const iconMap = {
      "fab fa-facebook-f": <Facebook size={18} />,
      "fab fa-linkedin-in": <Linkedin size={18} />,
      "fab fa-instagram": <Instagram size={18} />,
      "fab fa-youtube": <Youtube size={18} />,
      "fab fa-twitter": <Twitter size={18} />,
    };
    return iconMap[iconName] || <AlertTriangle size={18} />;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-8 flex items-center justify-center min-h-[200px]">
        <Loader size={30} className="text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 p-8">
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400">
          <p>Failed to load footer data: {error}</p>
        </div>
      </div>
    );
  }

  const { social_icons, g_setting } = footerData;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-6 py-10 max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#projects" className="text-gray-400 hover:text-green-400">
                Our Projects
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:text-green-400">
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-green-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            {g_setting.footer_phone && (
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="text-green-400 mr-2" />
                <a href={`tel:${g_setting.footer_phone}`} className="text-gray-400 hover:text-green-400">
                  {g_setting.footer_phone}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {social_icons.map((icon) => (
              <a
                key={icon.id}
                href={icon.social_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-600 to-green-700 hover:from-green-700 hover:to-amber-700 transition-all"
              >
                {getSocialIcon(icon.social_icon)}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Disclaimer Section (Moved to Bottom with RERA) */}
      <div className="border-t border-gray-700 mt-6 py-6 bg-black/70 text-center">
        <p className="text-sm text-green-400 mx-auto max-w-4xl">
          {g_setting.footer_disclamer}
        </p>
        {g_setting.footer_agent_rera && (
          <p className="mt-2 text-sm text-amber-500">
            Agent Rera: {g_setting.footer_agent_rera}
          </p>
        )}
      </div>

      {/* Copyright & Scroll Button */}
      <div className="border-t border-gray-700 bg-black/80 py-4">
        <div className="container mx-auto text-center">
          <p className="text-xs text-green-500">{g_setting.footer_copyright}</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
  onClick={scrollToTop}
  className="fixed bottom-6 right-6 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 text-gray-300 hover:text-white"
>
  <ChevronUp size={16} />
</button>

    </footer>
  );
};

export default Footer;
