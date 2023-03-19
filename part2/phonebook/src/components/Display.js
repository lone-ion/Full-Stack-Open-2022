import React from 'react';

const Display = ({ name, number, removePerson }) => {
  return (
    <div className='person'>
      {name} {number}
      <button onClick={removePerson}>Delete</button>
    </div>
  );
};

export default Display;
