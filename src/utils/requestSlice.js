import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],        // FIXED

  reducers: {
    addRequest: (state, action) => {
      return action.payload;  // expect full array
    },

    removeRequest: (state, action) => {
      // FIXED: remove by id (payload is ID)
      return state.filter(r => r._id !== action.payload);
    }
  }
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
