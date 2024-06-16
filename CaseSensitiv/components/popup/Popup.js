import React, { useContext, useCallback } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Popup.css";
import GenericButton from "../buttons/GenericButton";
import cancelIcon from "../../components/iconsLab/close.svg";

const Popup = ({ isOpen, onClose, title, children, popupStyle, onFileDrop, canClose = true }) => {
  const { theme } = useContext(ThemeContext);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        onFileDrop(files);
      }
    },
    [onFileDrop]
  );

  if (!isOpen) return null;

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  return (
    <div className={`popup-overlay ${theme}`} onClick={handleClose}>
      <div
        className={`popup-window ${theme}`}
        id={popupStyle}
        onClick={(e) => e.stopPropagation()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {canClose && (
          <div className="cancel-button">
            <GenericButton icon={cancelIcon} onClick={handleClose} />
          </div>
        )}
        {title && (
          <div className={`popup-title ${theme}`}>
            <h2>{title}</h2>
          </div>
        )}
        <div className={`popup-body ${theme}`}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
