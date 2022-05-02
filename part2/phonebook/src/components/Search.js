import React from 'react';

const Search = ({ newFilter, handleFilter }) => {
  return (
    <div>
      filter shown with: <input value={newFilter} onChange={handleFilter} />
    </div>
  );
};

export default Search;
