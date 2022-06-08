import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchUserInfo } from 'store/user';

type UserInfo = {
  id: number;
};

const User = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ user }) => user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    dispatch(fetchUserInfo(+value));
  };

  return (
    <>
      <div>
        <input type="text" onChange={handleChange} />
        <button onClick={handleClick}>유저 정보</button>
      </div>

      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>name: {user.name}</p>
          <p>username: {user.username}</p>
          <p>phone: {user.phone}</p>
        </div>
      )}
    </>
  );
};

export default User;
