import { useContext } from "react";
import "./VideoThumbnail.css";
import defaultVideoThumbnail from "../../components/iconsLab/defaultVideoThumbnail.png";
import { ThemeContext } from "../../contexts/ThemeContext";

const VideoThumbnail = ({ video, img }) => {
  const { theme } = useContext(ThemeContext);

  let thumbnailUrl;
  if (img) {
    thumbnailUrl = img;
  } else {
    if (video.thumbnail) {
      thumbnailUrl = `${process.env.REACT_APP_API_URL}/api/db${video.thumbnail}`;
    } else {
      thumbnailUrl = defaultVideoThumbnail;
    }
  }
  return (
    <div className={`thumbnail-container ${theme}`}>
      <img src={thumbnailUrl} alt={img ? "thumbnail" : video.title} className="video-thumbnail" />
    </div>
  );
};

export default VideoThumbnail;
