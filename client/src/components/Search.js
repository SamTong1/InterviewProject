import React, { useState } from "react";
import axios from "axios";

const Search = ({ search, setInput }) => {
  let inputHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="search">
      <input type="text" onChange={inputHandler} className="input" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
