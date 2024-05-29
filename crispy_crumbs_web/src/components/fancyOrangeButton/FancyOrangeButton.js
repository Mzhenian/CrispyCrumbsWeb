import "./FancyOrangeButton.css";

function FancyOrangeButton({ text, icon }) {
  return (
    <button className="fancy-orange-button">
      <span className="orange-button-text"> { text } </span>
    </button>
  );
}

export default FancyOrangeButton;
