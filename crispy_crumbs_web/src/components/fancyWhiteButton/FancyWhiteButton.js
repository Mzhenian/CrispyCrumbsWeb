import "./FancyWhiteButton.css";

function FancyWhiteButton({ text, icon }) {
  return (
    <button className="fancy-white-button">
      <span className="white-button-text"> { text } </span>
    </button>
  );
}

export default FancyWhiteButton;
