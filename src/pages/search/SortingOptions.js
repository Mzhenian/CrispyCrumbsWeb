import React from "react";
import GenericButton from "../../components/buttons/GenericButton";

const SortingOptions = ({ currentUser, handleSortChange }) => (
  <div className="sorting-filtering-options">
    {currentUser && <GenericButton text="Subscribed" onClick={() => handleSortChange("subscribed")} />}
    <GenericButton text="Most Watched" onClick={() => handleSortChange("most-watched")} />
    <GenericButton text="Most Recent" onClick={() => handleSortChange("most-recent")} />
    <GenericButton text="Suggested for you" onClick={() => handleSortChange("random")} />
  </div>
);

export default SortingOptions;
