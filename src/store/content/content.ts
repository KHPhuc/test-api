import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineNumbers: 0,
  contentType: "JSON",
  content: "",
};

const content = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLineNumbers(state, action) {
      state.lineNumbers = action.payload;
    },
    setContentType(state, action) {
      state.contentType = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
  },
});

export const { setLineNumbers, setContentType, setContent } = content.actions;

export default content.reducer;
