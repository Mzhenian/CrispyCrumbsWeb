import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import VideoThumbnail from "../../components/videoThumbnail/VideoThumbnail";
import sad404 from "../../components/iconsLab/notFound.svg";
import "./VideoList.css";
import GenericButton from "../buttons/GenericButton";
import editIcon from "../../components/iconsLab/edit.svg";
import { ViewContext } from "../../contexts/ViewContext";

const VideoList = ({
  videos,
  videoAuthors,
  handleAuthorClick,
  theme,
  sortOptions,
  isProfile = false,
  editVideo = false,
}) => {
  const { toggleView, view } = useContext(ViewContext);

  const ViewOptions = () => (
    <div className="sorting-filtering-options">
      <GenericButton text="Grid" onClick={() => toggleView()} />
    </div>
  );

  const videosList =
    videos.length > 0 ? (
      <div className={`watch-home-video-section ${theme}`}>
        {videos.map((video) => {
          const author = videoAuthors[video._id.toString()];
          return (
            <div key={video._id.toString()} className={`home-video-card ${theme}`}>
              <Link to={`/watch/${video._id.toString()}`} className="thumbnail-link">
                <VideoThumbnail video={video} />
              </Link>
              {editVideo && (
                <div className="video-list-edit-icon">
                  <GenericButton icon={editIcon} link={`/edit/${video._id}`} />
                </div>
              )}
              <div className="home-video-b">
                <div className="home-video-details">
                  {!isProfile && author && <ProfilePhoto user={author} clickable={true} />}
                  <div className="home-video-info">
                    <Link to={`/watch/${video._id.toString()}`} className="title-link">
                      <p className="home-video-title">{video.title}</p>
                    </Link>
                    {!isProfile && author && (
                      <div className="author-link" onClick={(e) => handleAuthorClick(e, author._id)}>
                        <p className="note">{author.userName}</p>
                      </div>
                    )}
                    <p className="note">{`${video.views} views`} </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="no-videos-found">
        <h1>No videos found</h1>
        <img src={sad404} alt="not-found" />
      </div>
    );

  return (
    <div>
      <div className="sorting-filtering-options">
        {sortOptions}
        <ViewOptions />
      </div>
      {videosList}
    </div>
  );
};

export default VideoList;
