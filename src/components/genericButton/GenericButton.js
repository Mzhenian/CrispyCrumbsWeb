import React from 'react';
import PropTypes from 'prop-types';
import './GenericButton.css';

const GenericButton = ({ text, onClick, style, icon }) => {
  return (
    <button className="generic-button" onClick={onClick} style={style}>
      {text}
      {icon && <span className="button-icon">{icon}</span>}
    </button>
  );
};

GenericButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  icon: PropTypes.node,
};

export default GenericButton;
