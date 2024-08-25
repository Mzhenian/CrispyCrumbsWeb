import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import VideoThumbnail from "../../components/videoThumbnail/VideoThumbnail";
import sad404 from "../../components/iconsLab/notFound.svg";
import "./VideoList.css";
import GenericButton from "../buttons/GenericButton";
import editIcon from "../../components/iconsLab/edit.svg";
import { ViewContext } from "../../contexts/ViewContext";
import gridIcon from "../iconsLab/grid.svg";
import listIcon from "../iconsLab/list.svg";

const VideoList = ({
  videos,
  videoAuthors,
  handleAuthorClick,
  theme,
  sortOptions,
  displayProfileImage = true,
  showView = false,
  isProfile = false,
  editVideo = false,
}) => {
  const { toggleView, view } = useContext(ViewContext);
  const listView = showView ? showView : view;
  const ViewOptions = () =>
    !showView && (
      <div className="sorting-filtering-options">
        <GenericButton icon={view === "grid" ? gridIcon : listIcon} onClick={toggleView} />
      </div>
    );

  const videosList =
    videos.length > 0 ? (
      <div className={`watch-${listView}-video-section ${theme}`}>
        {videos.map((video) => {
          const author = videoAuthors[video._id.toString()];
          return (
            <div key={video._id.toString()} className={`video-card ${theme} ${listView}`}>
              <div>
                <Link to={`/watch/${video._id.toString()}`} className={`thumbnail-link  ${listView}`}>
                  <VideoThumbnail video={video} />
                </Link>
                {editVideo && (
                  <div className="video-list-edit-icon">
                    <GenericButton icon={editIcon} link={`/edit/${video._id}`} />
                  </div>
                )}
              </div>
              <div className="video-details">
                {!isProfile && displayProfileImage && author && <ProfilePhoto user={author} clickable={true} />}
                <div className="video-info">
                  <Link to={`/watch/${video._id.toString()}`} className="title-link">
                    <p className="video-title">{video.title}</p>
                  </Link>
                  {!isProfile && author && (
                    <div className="author-link" onClick={(e) => handleAuthorClick(e, author._id)}>
                      <p className="note">{author.userName}</p>
                    </div>
                  )}
                  <p className="note">{`${video.views} views`}</p>
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
      {!showView && (
        <div className="sorting-filtering-options">
          {sortOptions}
          <ViewOptions />
        </div>
      )}

      {videosList}
    </div>
  );
};

export default VideoList;
