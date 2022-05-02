import React from 'react';

const Display = ({ name, number, deletePerson }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deletePerson}>Delete</button>
    </div>
  );
};

export default Display;
