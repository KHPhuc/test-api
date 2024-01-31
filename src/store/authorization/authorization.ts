import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authType: "BearerToken",
  auth: "",

  authBearer: "",

  username: "",
  password: "",

  authCustom: "",
};

const authorization = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setAuthType(state, action) {
      state.authType = action.payload;
    },
    setAuthBearer(state, action) {
      state.authBearer = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setAuthCustom(state, action) {
      state.authCustom = action.payload;
    },
  },
});

export const {
  setAuth,
  setAuthType,
  setAuthBearer,
  setUsername,
  setPassword,
  setAuthCustom,
} = authorization.actions;

export default authorization.reducer;
