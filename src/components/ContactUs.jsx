import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  User,
  Loader,
  Send,
  AlertCircle,
  Star,
} from "lucide-react";
import config from "../../config";

const ContactUs = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for form submission
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, "success", "error"
  const [errorMessage, setErrorMessage] = useState("");

  // Form state with keys matching the input names
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone_number.replace(/\s/g, ""))) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }

    return errors;
  };

  // Handle form submission (POSTing data to the API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${config.API_URL}/contact?website=${config.SLUG_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-[300px] p-8 flex items-center justify-center">
        <Loader size={30} className="text-green-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-gray-900 min-h-[300px] p-8">
        <div className="bg-red-900/20 p-4 rounded-lg text-red-400">
          <p>Failed to load contact information: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 relative overflow-hidden" id="contact">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl"></div>
      
      <div className="mb-16 text-center relative z-10">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-amber-500 mb-4">
          {contactData?.name || "Get In Touch"}
        </h2>
        <p className="text-green-300 max-w-md mx-auto">
          We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-gray-800/40 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-xl">
          {submitStatus === "success" && (
            <div className="mb-8 bg-green-900/20 border border-green-500/50 text-green-400 p-5 rounded-xl flex items-center">
              <div className="bg-green-500/20 p-2 rounded-full mr-3">
                <Star size={24} className="text-green-400" />
              </div>
              <p>Thank you for your message! We'll get back to you shortly.</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 bg-red-900/20 border border-red-500/50 text-red-400 p-5 rounded-xl flex items-center">
              <div className="bg-red-500/20 p-2 rounded-full mr-3">
                <AlertCircle size={24} className="text-red-400" />
              </div>
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="first_name" className="block text-gray-300 mb-2 font-medium">
                  First Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-green-400 group-focus-within:text-green-300 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/80 text-gray-200 border ${
                      formErrors.first_name
                        ? "border-red-500"
                        : "border-gray-700/50 group-focus-within:border-green-500"
                    } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                    placeholder="Your first name"
                  />
                </div>
                {formErrors.first_name && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-gray-300 mb-2 font-medium">
                  Last Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-green-400 group-focus-within:text-green-300 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/80 text-gray-200 border ${
                      formErrors.last_name
                        ? "border-red-500"
                        : "border-gray-700/50 group-focus-within:border-green-500"
                    } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                    placeholder="Your last name"
                  />
                </div>
                {formErrors.last_name && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email_id" className="block text-gray-300 mb-2 font-medium">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-green-400 group-focus-within:text-green-300 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email_id"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/80 text-gray-200 border ${
                      formErrors.email_id ? "border-red-500" : "border-gray-700/50 group-focus-within:border-green-500"
                    } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone_number" className="block text-gray-300 mb-2 font-medium">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-green-400 group-focus-within:text-green-300 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/80 text-gray-200 border ${
                      formErrors.phone_number
                        ? "border-red-500"
                        : "border-gray-700/50 group-focus-within:border-green-500"
                    } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                    placeholder="Your phone number"
                  />
                </div>
                {formErrors.phone_number && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.phone_number}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                Your Message
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none text-green-400 group-focus-within:text-green-300 transition-colors">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`w-full bg-gray-800/80 text-gray-200 border ${
                    formErrors.message ? "border-red-500" : "border-gray-700/50 group-focus-within:border-green-500"
                  } rounded-xl pl-12 p-4 focus:outline-none transition-all`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-500 to-amber-600 hover:from-green-600 hover:to-amber-700 active:from-green-700 active:to-amber-800 text-white font-medium transition-all duration-300 flex items-center justify-center shadow-lg shadow-green-600/20"
            >
              {submitting ? (
                <Loader size={20} className="animate-spin mr-2" />
              ) : (
                <Send size={18} className="mr-2" />
              )}
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;