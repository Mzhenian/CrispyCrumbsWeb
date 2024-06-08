import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoData from "../../DB/videosDB.json"; // Import video data
import "./watchvideo.css"; // Import CSS file for styles
const WatchVideo = () => {
  const { videoId } = useParams(); // Get videoId from URL parameters
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // Find the video by videoId
    const foundVideo = videoData.videos.find((v) => v.videoId === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      video.views++;
    }
  }, [videoId]);

  if (!video) {
    return <div>404 Video not found</div>;
  }

  return (
    <div className="watch-video-container">
      <video controls>
        <source src={process.env.PUBLIC_URL + video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-details">
        <h1>{video.title}</h1>
        <p>{video.description}</p>
        <p>{video.views} views</p>
        <p>
          {video.likes} likes | {video.dislikes} dislikes
        </p>
        {/* Add more details and comments section as needed */}
      </div>
    </div>
  );
};

export default WatchVideo;
