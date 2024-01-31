import { createSlice } from "@reduxjs/toolkit";
import encodeUrl from "encodeurl";

const initialState = {
  lineRaw: 0,
  raw: "",
};

const raw = createSlice({
  name: "raw",
  initialState,
  reducers: {
    setLineRaw(state, action) {
      state.lineRaw = action.payload;
    },
    setRaw(state, action) {
      state.raw = action.payload;
    },
  },
});

export const { setLineRaw, setRaw } = raw.actions;

export default raw.reducer;

export const generateRaw = () => (dispatch: any) => {
  const url = store.getState().request.url;
  const method = store.getState().request.method;
  const authType = store.getState().authorization.authType;
  const auth = store.getState().authorization.auth;
  const headers = store.getState().headers.headers;

  let rawPre = "";
  if (
    url !== "" &&
    (url.trim().match(/^https:\/{2}([\w\d-]+\.{1})([\w\d-]+\.*){1,}.*$/) ||
      url.trim().match(/^http:\/{2}([\w\d-]+\.{1})([\w\d-]+\.*){1,}.*$/))
  ) {
    rawPre += method.toUpperCase() + " ";

    let tmpUrl = url.trim();
    const https = tmpUrl.indexOf("https://");
    if (https === 0) {
      tmpUrl = tmpUrl.replace(/^https:\/{0,2}[\w\d-.]*/, "");
    } else {
      const http = tmpUrl.indexOf("http://");
      if (http === 0) {
        tmpUrl = tmpUrl.replace(/^http:\/{0,2}[\w\d-.]*/, "");
      }
    }
    const encodeURL = encodeUrl(tmpUrl);
    if (tmpUrl === "") {
      rawPre += "/";
    } else {
      rawPre += encodeURL;
    }
    rawPre += " HTTP/1.1\n";

    switch (authType) {
      case "BearerToken":
        if (auth !== "") rawPre += `Authorizaion: Bearer ${auth}\n`;
        break;
      case "BasicAuth":
        if (auth !== "") rawPre += `Authorization: Basic ${auth}\n`;
        break;
      case "Custom":
        if (auth !== "") rawPre += `Authorization: ${auth}\n`;
        break;
    }

    const host = url.trim().split("//")[1].split("/");
    rawPre += `Host: ${host}\n`;

    if (headers !== "") {
      const splitHeaders = headers.split("\n");
      splitHeaders.forEach((e: any) => {
        const splitE = e.split(":");
        if (splitE.length === 1) {
          rawPre += `${splitE[0]}: \n`;
        } else {
          splitE[1] = splitE[1].replace(/^\s+/, "");
          splitE[splitE.length - 1] = splitE[splitE.length - 1].replace(
            /\s+$/,
            ""
          );
          rawPre += `${splitE[0]}: ${splitE.slice(1).join(":")}\n`;
        }
      });
    }

    //dispatch(setRaw(rawPre));
  } else {
    //dispatch(setRaw(""));
  }
};
