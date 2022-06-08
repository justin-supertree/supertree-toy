import React, { useState } from 'react';

type UserInfo = {
  id: number;
};

const User = () => {
  const [value, setValue] = useState('');
  const [user, setUser] = useState<UserInfo | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setUser({ id: +value });
  };

  return (
    <>
      <div>
        <input type="text" onChange={handleChange} />
        <button onClick={handleClick}>유저 정보</button>
      </div>

      {user && <div>ID: {user.id}</div>}
    </>
  );
};

export default User;
