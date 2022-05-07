import React from 'react';

const Display = ({ name, number, deletePerson }) => {
  return (
    <div className='person'>
      {name} {number}
      <button onClick={deletePerson}>Delete</button>
    </div>
  );
};

export default Display;
