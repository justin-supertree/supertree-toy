import { createSlice } from '@reduxjs/toolkit';

type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increament: (state) => {
      state.count = state.count + 1;
    },
    decreament: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { increament, decreament } = counterSlice.actions;

export default counterSlice.reducer;
