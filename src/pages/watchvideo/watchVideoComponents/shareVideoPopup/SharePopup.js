import React from "react";
import Popup from "../../../../components/popup/Popup";
import "./SharePopup.css";

import shareX from "../../../../components/iconsLab/shareX.svg";
import shareFacebook from "../../../../components/iconsLab/shareFacebook.svg";
import shareInstagram from "../../../../components/iconsLab/shareInstagram.svg";
import shareWhatsapp from "../../../../components/iconsLab/shareWhatsapp.svg";
import copyIcon from "../../../../components/iconsLab/copy.svg";

const SharePopup = ({ isOpen, onClose }) => {
  const url = encodeURIComponent(window.location.href);
  const xtext = encodeURIComponent("Check this out!");
  //const shareUrlFacebook = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  const shareUrlX = `https://twitter.com/intent/tweet?url=${url}&text=${xtext}`;
  const shareUrlWhatsapp = `https://wa.me/?text=${url}`;
  const InstagramUrl = "https://instagram.com/";
  const FacebookUrl = "https://www.facebook.com/";

  const handleShareLinks = (string, link) => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert("URL copied to clipboard! " + string);
        if (link) {
          window.open(link, "_blank");
        }
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Share this video">
      <div className="social-photos-layout">
        <a className="social-container" id="x-container" href={shareUrlX} target="_blank" rel="noopener noreferrer">
          <img src={shareX} alt="share on X" className="social-thumbnail" />
        </a>

        <div
          className="social-container"
          id="facebook-container"
          onClick={() => handleShareLinks("continue to open Facebook.", FacebookUrl)}
        >
          <img src={shareFacebook} alt="share on Instagram" className="social-thumbnail" />
        </div>

        <div
          className="social-container"
          id="instagram-container"
          onClick={() => handleShareLinks("continue to open Instagram.", InstagramUrl)}
        >
          <img src={shareInstagram} alt="share on Instagram" className="social-thumbnail" />
        </div>

        <a
          className="social-container"
          id="whatsapp-container"
          href={shareUrlWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={shareWhatsapp} alt="share on Whatsapp" className="social-thumbnail" />
        </a>

        <div className="social-container" id="share-link-container" onClick={() => handleShareLinks("")}>
          <img src={copyIcon} alt="Copy URL" className="social-thumbnail" />
        </div>
      </div>
    </Popup>
  );
};

export default SharePopup;
