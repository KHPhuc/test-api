import { createSlice } from "@reduxjs/toolkit";
import encodeUrl from "encodeurl";

const initialState = {
  lineRaw: 0,
  raw: "",
  rawUrl: "",
  rawHost: "",
  rawContent: "",
  rawHeaders: "",
  rawAuthorization: "",
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
    setRawUrl(state, action) {
      state.rawUrl = action.payload;
    },
    setRawAuthorization(state, action) {
      state.rawAuthorization = action.payload;
    },
    setRawHost(state, action) {
      state.rawHost = action.payload;
    },
    setRawContent(state, action) {
      state.rawContent = action.payload;
    },
    setRawHeaders(state, action) {
      state.rawHeaders = action.payload;
    },
  },
});

export const {
  setLineRaw,
  setRaw,
  setRawUrl,
  setRawAuthorization,
  setRawHost,
  setRawContent,
  setRawHeaders,
} = raw.actions;

export default raw.reducer;

export const generateRawUrl = (url: any, method: any) => (dispatch: any) => {
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
    rawPre += " HTTP/1.1";

    dispatch(setRawUrl(rawPre));

    const host = url.trim().split("//")[1].split("/");
    dispatch(setRawHost(`Host: ${host}`));
  } else {
    dispatch(setRawUrl(""));
  }
};

export const generateRawAuth =
  (authType: any, auth: any) => (dispatch: any) => {
    let rawPre = "";
    switch (authType) {
      case "BearerToken":
        if (auth !== "") rawPre += `Authorizaion: Bearer ${auth}`;
        break;
      case "BasicAuth":
        if (auth !== "") rawPre += `Authorization: Basic ${auth}`;
        break;
      case "Custom":
        if (auth !== "") rawPre += `Authorization: ${auth}`;
        break;
    }
    dispatch(setRawAuthorization(rawPre));
  };

export const generateRawHeaders = (headers: any) => (dispatch: any) => {
  let rawPre = "";
  if (headers !== "") {
    const splitHeaders = headers.split("\n");
    splitHeaders.forEach((e: any, i: any) => {
      if (i !== 0) rawPre += "\n";
      const splitE = e.trim().split(":");
      if (splitE.length === 1) {
        rawPre += `${splitE[0]}: `;
      } else {
        splitE[1] = splitE[1].replace(/^\s+/, "");
        rawPre += `${splitE[0]}: ${splitE.slice(1).join(":")}`;
      }
    });
  }
  dispatch(setRawHeaders(rawPre));
};

export const generateRawContent =
  (contentType: any, content: any) => (dispatch: any) => {
    let splitContent: any;
    let cache: any;
    switch (contentType) {
      case "FORM":
        splitContent = content.split("\n");
        cache = content.split("\n");
        splitContent.forEach((e: any, i: any) => {
          const splitE = e.trim().split("=");
          if (splitE.length === 1) {
            cache[i] = splitE[0].trim();
          } else {
            splitE[0] = splitE[0].trim();
            splitE[1] = splitE[1].replace(/^\s+/, "");
            cache[i] = splitE.join("=");
          }
        });
        dispatch(setRawContent(cache.join("\n")));
        break;
      default:
        dispatch(setRawContent(content));
        break;
    }
  };
