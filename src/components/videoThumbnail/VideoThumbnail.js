import "./VideoThumbnail.css";

const VideoThumbnail = ({ video }) => {
  const thumbnailUrl = `${process.env.REACT_APP_API_URL}/api/db${video.thumbnail}`;
  return (
    <div className="thumbnail-container">
      <img src={thumbnailUrl} alt={`${video.title}`} className="video-thumbnail" />
    </div>
  );
};

export default VideoThumbnail;
