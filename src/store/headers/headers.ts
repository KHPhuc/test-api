import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headers: "",
};

const headers = createSlice({
  name: "headers",
  initialState,
  reducers: {
    setHeaders(state, action) {
      state.headers = action.payload;
    },
  },
});

export const { setHeaders } = headers.actions;

export default headers.reducer;
