import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authType: "BearerToken",
  auth: "",
};

const authorization = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setAuthType(state, action) {
      state.authType = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const { setAuthType, setAuth } = authorization.actions;

export default authorization.reducer;
