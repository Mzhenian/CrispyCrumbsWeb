import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import DropDownMenu from "../../components/Inputs/DropDownMenu";
import ListInput from "../../components/Inputs/ListInput";
import { countries } from "../../components/Inputs/LongListsData";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    destination: "Israel",
    platform: "facebook",
    links: [],
    hashtags: [],
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={`page page-${theme}`}>
      <h1>Page 1</h1>
      <DropDownMenu
        name="destination"
        arr={countries}
        value={formData.destination}
        showFlag={true}
        action={handleInputChange}
      />
      <ListInput list={formData.hashtags} listName="hashtags" action={handleInputChange} editMode={true} />
    </div>
  );
};

export default Home;
