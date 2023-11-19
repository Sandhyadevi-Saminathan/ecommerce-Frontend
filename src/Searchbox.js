// SearchBox.js

import React from 'react';

const Searchbox = ({ handleSearch }) => {
  const handleInputChange = (e) => {
    // Pass the search query to the parent component
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleInputChange}
      className="form-control"
    />
  );
};

export default Searchbox;
