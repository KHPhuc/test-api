import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  raw: "",
};

const raw = createSlice({
  name: "raw",
  initialState,
  reducers: {
    setRaw(state, action) {
      state.raw = action.payload;
    },
  },
});

export const { setRaw } = raw.actions;

export default raw.reducer;
