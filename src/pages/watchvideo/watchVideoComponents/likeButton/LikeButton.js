import React, { useContext } from "react";
import { ThemeContext } from "../../../../ThemeContext";
import likeIcon from "../../../../components/iconsLab/like.svg";
import dislikeIcon from "../../../../components/iconsLab/dislike.svg";
import likeIconLight from "../../../../components/iconsLab/like-light.svg";
import dislikeIconLight from "../../../../components/iconsLab/dislike-light.svg";
import likeIconDark from "../../../../components/iconsLab/like-dark.svg";
import dislikeIconDark from "../../../../components/iconsLab/dislike-dark.svg";

import "./likeButton.css";

const LikeButton = ({ counter, like, dislike, likeSelected, dislikeSelected }) => {
  const { theme } = useContext(ThemeContext);

  const getLikeIcon = () => {
    if (likeSelected) return likeIcon;
    return theme === "light" ? likeIconLight : likeIconDark;
  };

  const getDislikeIcon = () => {
    if (dislikeSelected) return dislikeIcon;
    return theme === "light" ? dislikeIconLight : dislikeIconDark;
  };

  return (
    <div className={`like-button ${theme}`}>
      <div className={`like-button-left ${likeSelected ? `selected ${theme}` : ""}`} onClick={like}>
        {counter}
        <img className="button-icon" src={getLikeIcon()} alt="like" />
      </div>
      <div className={`like-button-right ${dislikeSelected ? `selected ${theme}` : ""}`} onClick={dislike}>
        <img className="button-icon" src={getDislikeIcon()} alt="dislike" />
      </div>
    </div>
  );
};

export default LikeButton;
