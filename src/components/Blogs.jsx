import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  BookOpen,
  Clock,
  Loader,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import config from "../../config";

const BlogCard = ({ blog }) => {
  // Format date from "2024-11-25 16:42:02" to "Nov 25, 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Estimate reading time based on content length
  const calculateReadingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return minutes;
  };

  return (
    <div id="Blogs" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:rotate-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col p-6">
      {/* Blog Image */}
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-md">
          <img
            src={blog.post_photo}
            alt={blog.post_title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-center mt-6 flex-grow flex flex-col">
        {/* Meta Info */}
        <div className="flex justify-center items-center text-green-400 text-sm">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(blog.created_at)}</span>
          <span className="mx-2">•</span>
          <Clock size={14} className="mr-1" />
          <span>{calculateReadingTime(blog.post_content)} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-amber-300 mt-3 line-clamp-2">
          {blog.post_title}
        </h3>

        {/* Summary */}
        <p className="text-green-100 mt-2 text-sm line-clamp-3 flex-grow">
          {blog.post_content_short}
        </p>

        {/* Read More */}
        <div className="mt-4">
          <a
            href={`/blogs/${blog.post_slug}`}
            className="inline-flex items-center text-amber-400 hover:text-amber-900 group"
          >
            <span className="mr-1">Read More</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/blogs?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: document.getElementById("blogs-section").offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div
        id="blogs-section"
        className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[400px] flex items-center justify-center"
      >
        <Loader size={36} className="text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        id="blogs-section"
        className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 min-h-[400px]"
      >
        <div className="bg-amber-900/20 p-4 rounded-lg text-amber-400 max-w-4xl mx-auto">
          <div className="flex items-center">
            <AlertTriangle size={24} className="mr-2" />
            <p>Failed to load blogs: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="blogs-section" className="bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-400 mb-3">Latest Insights</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="px-4 flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === index + 1
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
