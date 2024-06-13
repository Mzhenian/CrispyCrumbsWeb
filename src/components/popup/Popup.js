import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import "./popup.css";
import GenericButton from "../buttons/GenericButton";
import cancelIcon from "../../components/iconsLab/close.svg";

const Popup = ({ isOpen, onClose, title, children, popupStyle }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-window ${theme}`} id={popupStyle} onClick={(e) => e.stopPropagation()}>
        <div className="cancel-button">
          <GenericButton icon={cancelIcon} onClick={onClose} />
        </div>
        {title && (
          <div className={`popup-title ${theme}`}>
            <h2>{title}</h2>
          </div>
        )}

        <div className={`popup-body ${theme}`}> {children}</div>
      </div>
    </div>
  );
};

export default Popup;
