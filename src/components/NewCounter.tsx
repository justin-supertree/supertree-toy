import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewCounter = () => {
  const [count, setCount] = useState(0);

  const handleIncreament = () => {
    setCount(count + 1);
  };

  const handleDecreament = () => {
    setCount(count - 1);
  };

  return (
    <>
      <h1>{count}</h1>

      <div>
        <button onClick={handleIncreament}>+</button>
        <button onClick={handleDecreament}>-</button>
      </div>
      <div>
        <Link to="/">Counter</Link>
      </div>
    </>
  );
};

export default NewCounter;
