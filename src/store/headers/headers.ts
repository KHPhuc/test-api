import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineHeader: 0,
  headers: "",
};

const headers = createSlice({
  name: "headers",
  initialState,
  reducers: {
    setLineHeader(state, action) {
      state.lineHeader = action.payload;
    },
    setHeaders(state, action) {
      state.headers = action.payload;
    },
  },
});

export const { setLineHeader, setHeaders } = headers.actions;

export default headers.reducer;
