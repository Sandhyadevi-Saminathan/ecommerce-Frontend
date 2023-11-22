import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Filter = ({ handleFilter }) => {
  const [showOptions, setShowOptions] = useState(false);
  const filterRef = useRef(null);

  const handleSelect = (option) => {
    setShowOptions(false);
    handleFilter(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
    ref={filterRef}
     className="dropdown">
      <FontAwesomeIcon
        icon={faFilter}
        className="filter-icon"
        onClick={() => setShowOptions(!showOptions)}
      />
      <div
        className={`dropdown-menu${showOptions ? ' show' : ''}`}
        aria-labelledby="filterDropdown"
      >
        <button className="dropdown-item" onClick={() => handleSelect('atoz')}>
          A to Z
        </button>
        <button className="dropdown-item" onClick={() => handleSelect('ztoa')}>
          Z to A
        </button>
        <button className="dropdown-item" onClick={() => handleSelect('lowtohigh')}>
          Price Low to High
        </button>
        <button className="dropdown-item" onClick={() => handleSelect('hightolow')}>
          Price High to Low
        </button>
      </div>
    </div>
  );
};

export default Filter;
