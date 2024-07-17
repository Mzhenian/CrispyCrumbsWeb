import "./VideoThumbnail.css";
import defaultVideoThumbnail from "../../components/iconsLab/defaultVideoThumbnail.png";

const VideoThumbnail = ({ video, img }) => {
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
    <div className="thumbnail-container">
      <img src={thumbnailUrl} alt={img ? "thumbnail" : video.title} className="video-thumbnail" />
    </div>
  );
};

export default VideoThumbnail;
