import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { increament, decreament } from 'store/counter';
import { useAppDispatch, useAppSelector } from 'store/hook';
import User from './User';

const Counter = () => {
  const { count } = useAppSelector(({ counter }) => counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log();
  }, []);

  return (
    <>
      <h1>{count}</h1>
      <div>
        <button
          onClick={() => {
            dispatch(increament());
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch(decreament());
          }}
        >
          -
        </button>
      </div>
      <div>
        <Link to="/Counter">Counter</Link>
      </div>
      <User />
    </>
  );
};

export default Counter;
