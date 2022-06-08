import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { type } from 'os';

export type UserInfo = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type State = {
  user: UserInfo | null;
};

const initialState: State = {
  user: null,
};

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (id: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    console.log(response);

    return response.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
