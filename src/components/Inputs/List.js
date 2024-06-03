import "./inputs.css";
import removeIcon from "../iconsLab/close.svg";

export default function List(props) {
  const removeItem = (index) => {
    const updatedList = props.list;
    updatedList.splice(index, 1);
    props.action(props.listName, updatedList);
  };

  const removeAll = () => {
    props.action(props.listName, []);
  };

  return (
    props.list.length !== 0 && (
      <div className="input-items-list">
        {props.list.map((item, index) => (
          <div className="field" id="input-item" key={index}>
            {item}
            {props.editMode && (
              <img src={removeIcon} className="App-icon" id="action-icon" alt="icon" onClick={() => removeItem()} />
            )}
          </div>
        ))}
        {props.list.length > 2 && props.editMode && (
          <div className="field" id="action-icon" onClick={() => removeAll()}>
            Remove All
          </div>
        )}
      </div>
    )
  );
}
