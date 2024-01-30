import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenGenerateCode: false,
  isOpenResponse: true,
};

const system = createSlice({
  name: "system",
  initialState,
  reducers: {
    setIsOpenGenerateCode(state, action) {
      state.isOpenGenerateCode = action.payload;
    },
    setIsOpenResponse(state, action) {
      state.isOpenResponse = action.payload;
    },
  },
});

export const { setIsOpenGenerateCode, setIsOpenResponse } = system.actions;

export default system.reducer;
