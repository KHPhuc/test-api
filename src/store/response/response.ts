import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 0,
};

const response = createSlice({
  name: "response",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = response.actions;

export default response.reducer;
