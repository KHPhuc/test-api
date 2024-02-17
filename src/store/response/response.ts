import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "",
  headers: "",
  status: 0,
  time: 0,
  size: 0,
};

const response = createSlice({
  name: "response",
  initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setHeaders(state, action) {
      const data = action.payload;
      let header = "";
      Object.keys(data).forEach((e, i) => {
        let key: any = e.split("-");
        key.forEach((k: any, i: any) => {
          key[i] = k.substring(0, 1).toUpperCase() + k.substring(1);
        });
        key = key.join("-");
        if (i !== 0) header += "\n";
        if (typeof data[e] === "object") {
          console.log(data[e]);
          data[e].forEach((e1: any, i1: any) => {
            header += `${key}: ${e1}`;
            if (i1 !== data[e].length - 1) {
              header += "\n";
            }
          });
        } else {
          header += `${key}: ${data[e]}`;
        }
      });
      state.headers = header;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
  },
});

export const { setContent, setHeaders, setStatus, setTime, setSize } =
  response.actions;

export default response.reducer;
