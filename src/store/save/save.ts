import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listSaved: [
    // {
    //   method: "get",
    //   url: "",
    //   contentType: "JSON",
    //   content: "",
    //   authorization: "BearerToken",
    //   auth: "",
    //   authBearer: "",
    //   username: "",
    //   password: "",
    //   authCustom: "",
    //   header: "",
    // },
  ],
};

const save = createSlice({
  name: "save",
  initialState,
  reducers: {
    setListSaved(state, action) {
      state.listSaved = action.payload;
    },
  },
});

export const { setListSaved } = save.actions;

export default save.reducer;
