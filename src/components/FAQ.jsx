import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, AlertCircle, Loader } from "lucide-react";
import config from "../../config";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/faq?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }

        const data = await response.json();
        setFaqs(data.faqs);
        setHeading(data.page[0]?.heading || "Frequently Asked Questions");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleQuestionClick = (id) => {
    setActiveQuestion((prev) => (prev === id ? null : id)); // Toggle active question
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-[300px] p-8">
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400 flex items-center gap-3">
          <AlertCircle size={20} />
          <p>Failed to load FAQs: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-amber-400 text-center">{heading}</h2>
        <p className="text-green-400 text-center mt-3 max-w-2xl mx-auto">
          Find answers to commonly asked questions about Ceratec Tower 1o8 Balewadi
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-gray-800/60 border border-gray-700 rounded-lg">
            <button
              onClick={() => handleQuestionClick(faq.id)}
              className="w-full flex items-center justify-between p-4 text-left transition-all hover:bg-gray-700 hover:border-purple-500"
            >
              <span className="text-green-200 font-medium text-lg">
                {faq.faq_title}
              </span>
              {activeQuestion === faq.id ? (
                <ChevronDown className="text-green-400" />
              ) : (
                <ChevronRight className="text-green-400" />
              )}
            </button>

            {activeQuestion === faq.id && (
              <div className="p-4 border-t border-green-500 text-amber-300">
                {stripHtml(faq.faq_content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
