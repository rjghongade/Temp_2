import React, { useState, useEffect } from "react";
import config from "../../config";

const VideoTour = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${config.API_URL}/video?website=${config.SLUG_URL}`);

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();
        setVideos(data.property_videos || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black text-white">
      {loading ? (
        <div className="text-lg font-semibold animate-pulse">Loading Video Tour...</div>
      ) : error ? (
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      ) : videos.length > 0 ? (
        <div className="absolute inset-0">
          <iframe
            src={`https://www.youtube.com/embed/${videos[0].youtube_video_id}?autoplay=1&loop=1&mute=1&playlist=${videos[0].youtube_video_id}`}
            title="Property Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
          ></iframe>
        </div>
      ) : (
        <div className="text-gray-400 text-lg">No videos available</div>
      )}
    </div>
  );
};

export default VideoTour;
