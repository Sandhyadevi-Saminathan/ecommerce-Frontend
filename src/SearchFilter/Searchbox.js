

import React from 'react';

const Searchbox = ({ handleSearch }) => {
  const handleInputChange = (e) => {
   
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleInputChange}
      className="form-control"
      style={{width:"500px"}}
    />
  );
};

export default Searchbox;
