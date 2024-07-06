import React from "react";
import Popup from "../../../../components/popup/Popup";
import "./SharePopup.css";

import shareX from "../../../../components/iconsLab/shareX.svg";
import shareFacebook from "../../../../components/iconsLab/shareFacebook.svg";
import shareInstagram from "../../../../components/iconsLab/shareInstagram.svg";
import shareWhatsapp from "../../../../components/iconsLab/shareWhatsapp.svg";

const SharePopup = ({ isOpen, onClose }) => {
  const arr = [shareX, shareInstagram, shareWhatsapp, shareFacebook];
  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Share this video">
      <div className="social-photos-layout">
        {arr.map((icon) => (
          <div className="thumbnail-container" id="social-container" key={icon}>
            <img src={icon} alt="SocialIcon" className="social-thumbnail" />
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default SharePopup;
