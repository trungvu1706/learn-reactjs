import React from 'react';
import { not_found } from '../../asset/img';

const NotFound = () => {
  return (
    <div>
      <img
        src={not_found}
        alt="Not-found"
        style={{
          width: '400px',
          height: '200px',
          margin: '50px',
        }}
      />
    </div>
  );
};

export default NotFound;
