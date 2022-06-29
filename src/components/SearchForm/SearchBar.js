import React, { useState } from "react";
import "./SearchBar.css";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    // console.log(typeof searchWord);
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        // <div className="dataResult">
        <Form.Select
          id="food_group_name"
          name="food_group_name"
          //   defaultValue={foodGroupName}
          type="text"
          onChange={(e) => {
            console.log(e.target.options.selectedIndex + 1);
            //   setFoodGroupId(e.target.options.selectedIndex + 1);
          }}
        >
          {filteredData.map((value, key) => {
            return <option>{value.name}</option>;
          })}
        </Form.Select>
        // </div>
      )}
    </div>
  );
}

export default SearchBar;
