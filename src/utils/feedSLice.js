import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [], // use empty array so .map works immediately
  reducers: {
    addFeed: (state, action) => {
      // expect an array
      return action.payload;
    },
    removeFeed: (state, action) => {
      // action.payload should be the userId (string)
      return state.filter((user) => user._id !== action.payload);
    }
  }
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
