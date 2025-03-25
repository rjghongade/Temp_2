import React, { useState } from "react";
import { MessageCircle, Phone, User, X } from "lucide-react";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const buttons = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} className="text-green-400" />,
      label: "WhatsApp",
      href: `https://wa.me/918181817136?text=I%20am%20interested` ,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "phone",
      icon: <Phone size={20} className="text-blue-400" />,
      label: "Call",
      href: "tel:+918181817136",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "contact",
      icon: <User size={20} className="text-red-400"/>,
      label: "Contact",
      href: "#contact",
      color:
        "bg-red-500 hover:bg-red-600",
    },
  ];

  return (
    <>
      <div className="fixed bottom-12 right-8 z-50 flex flex-col-reverse items-end gap-4">
        {isExpanded && (
          <div className="flex flex-col-reverse gap-3 transition-all duration-300 ease-in-out">
            {buttons.map((button) => (
              <a
                key={button.id}
                href={button?.href}
                onClick={button?.openDialog}
                className={`flex items-center justify-between w-40 px-4 py-3 rounded-full text-white shadow-xl transition-all duration-300 ${button.color}`}
                target={button.id === "whatsapp" ? "_blank" : "_self"}
                rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
              >
                <span className="text-sm font-semibold">{button.label}</span>
                <span className="p-2 rounded-full bg-white bg-opacity-20">{button.icon}</span>
              </a>
            ))}
          </div>
        )}

        <button
          onClick={toggleExpand}
          className="p-4 rounded-full bg-gradient-to-r  to-amber-600 hover:from-amber-700 shadow-lg border transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label="Toggle floating menu"
        >
          {isExpanded ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
