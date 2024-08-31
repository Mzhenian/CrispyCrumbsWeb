import React, { useContext, useState, useEffect } from "react";
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
import "../../routes/Routs.css";

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
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    if (videos.length === 0) {
      const timer = setTimeout(() => setShowNotFound(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [videos]);

  const listView = showView ? showView : view;
  const ViewOptions = () =>
    !showView && (
      <div className="sorting-filtering-options">
        <GenericButton icon={view === "grid" ? gridIcon : listIcon} onClick={toggleView} />
      </div>
    );

  const videosList = videos.length > 0 && (
    <div className={`watch-${listView}-video-section ${theme}`}>
      {videos.map((video) => {
        const author = videoAuthors[video._id.toString()];
        return (
          <div key={video._id.toString()} className={`video-card ${theme} ${listView}`}>
            <div>
              <Link to={`/watch/${video._id.toString()}`} className={`thumbnail-link  ${listView}`}>
                {editVideo && (
                  <div className="video-list-edit-icon">
                    <GenericButton icon={editIcon} link={`/edit/${video._id}`} />
                  </div>
                )}
                <VideoThumbnail video={video} />
              </Link>
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
  );

  return videos.length > 0 ? (
    <div>
      {!showView && (
        <div className="sorting-filtering-options">
          {sortOptions}
          <ViewOptions />
        </div>
      )}
      {videosList}
    </div>
  ) : showNotFound ? (
    <div className="route">
      {isProfile ? (
        editVideo ? (
          <>
            <p>You haven't uploaded any videos yet.</p>
            <br />
            <GenericButton text="Click here to upload your first one" link="/uploadvideo" />
          </>
        ) : (
          <p>No videos uploaded to this channel yet</p>
        )
      ) : (
        <>
          <img src={sad404} alt="not-found" />
          <h1>404</h1>
          <p>No Videos Found</p>
        </>
      )}
    </div>
  ) : null;
};

export default VideoList;
