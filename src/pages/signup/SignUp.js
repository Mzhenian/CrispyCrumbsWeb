import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext.js";
import DropDownMenu from "../../components/Inputs/DropDownMenu.js";
import ListInput from "../../components/Inputs/ListInput.js";
import { countries } from "../../components/Inputs/CountriesListsData.js";
import Container from "../../components/container/Container.js";

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
      <Container title={"page1"} width={"1000px"}>
        <DropDownMenu
          name="destination"
          arr={countries}
          value={formData.destination}
          showFlag={true}
          action={handleInputChange}
        />
        <ListInput list={formData.hashtags} listName="hashtags" action={handleInputChange} editMode={true} />
      </Container>
    </div>
  );
};

export default Home;
