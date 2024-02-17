import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import {
  setContent,
  setHeaders,
  setSize,
  setStatus,
  setTime,
} from "../response/response";
import prettyBytes from "pretty-bytes";
import { setIsOpenResponse } from "../system/system";

const initialState = {
  url: "",
  method: "get",
  isRequsting: false,
};

const request = createSlice({
  name: "request",
  initialState,
  reducers: {
    setUrl(state, action) {
      state.url = action.payload;
    },
    setMethod(state, action) {
      state.method = action.payload;
    },
    setIsRequesting(state, action) {
      state.isRequsting = action.payload;
    },
  },
});

export const { setUrl, setMethod, setIsRequesting } = request.actions;

export default request.reducer;

/*
data = {
  url,
  method,
  content,
  contentType,
  auth,
  authType
}

contentType
  - FORM
  - JSON
  - HTML
  - XML
  - TEXT

authType
  - BearerToken
  - BasicAuth
  - Custom
  - NoAuths
*/
export const makeRequest = (data: any) => (dispatch: any) => {
  dispatch(setIsOpenResponse(false));
  dispatch(setIsRequesting(true));
  const payload = handleContent(data.contentType, data.content);
  const header = {
    ...handleHeaderContent(data.contentType),
    ...handleHeaderAuth(data.authType, data.auth),
    ...handleHeader(data.headers),
  };

  delete header[""];

  const config = {
    method: data.method,
    url: data.url,
    headers: header,
    data: payload,
    maxRedirects: 20,
  };

  axios
    .post("http://localhost:3000/api/v1/requests", config)
    .then((res) => {
      const data = res.data;
      dispatch(setContent(data.content));
      dispatch(setSize(prettyBytes(data.contentLength)));
      dispatch(setHeaders(data.headers));
      dispatch(setTime(data.elapsed));
      dispatch(setStatus(data.statusCode));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setIsOpenResponse(true));
      dispatch(setIsRequesting(false));
    });
};

const handleContent = (contentType: any, content: any) => {
  if (
    contentType === "HTML" ||
    contentType === "XML" ||
    contentType === "TEXT"
  ) {
    return content;
  }

  if (contentType === "FORM") {
    if (content === "") {
      return qs.stringify({});
    } else {
      const payload: any = {};
      const splitContent = content.split("\n");
      splitContent.forEach((e: any) => {
        const splitValue = e.split("=");
        if (splitValue[1].length === 1) {
          payload[`${splitValue[0].trim()}`] = "";
        } else {
          payload[`${splitValue[0].trim()}`] = splitValue
            .slice(1)
            .join("=")
            .trim();
        }
      });
      return qs.stringify(payload);
    }
  }

  if (contentType === "JSON") {
    if (content === "") {
      return "";
    } else {
      return JSON.stringify(JSON.parse(content));
    }
  }
};

const handleHeaderContent = (contentType: any) => {
  let cache = {};
  switch (contentType) {
    case "FORM":
      cache = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      break;
    case "JSON":
      cache = {
        "Content-Type": "application/json",
      };
      break;
    case "HTML":
      cache = {
        "Content-Type": "text/html",
      };
      break;
    case "XML":
      cache = {
        "Content-Type": "application/xml",
      };
      break;
    case "TEXT":
      cache = {
        "Content-Type": "text/plain",
      };
      break;
    default:
      break;
  }

  return cache;
};

const handleHeaderAuth = (authType: any, auth: any) => {
  let cache = {};

  if (!auth) {
    return cache;
  }

  switch (authType) {
    case "BearerToken":
      cache = {
        Authorization: `Bearer ${auth}`,
      };
      break;
    case "BasicAuth":
      cache = {
        Authorization: `Basic ${auth}`,
      };
      break;
    case "Custom":
      cache = {
        Authorization: `${auth}`,
      };
      break;
    default:
      break;
  }

  return cache;
};

const handleHeader = (headers: any) => {
  const cache: any = {};
  const splitHeaders = headers.split("\n");
  splitHeaders.forEach((e: any) => {
    const splitE = e.split(":");
    if (splitE.length === 1) {
      cache[splitE[0]] = "";
    } else {
      splitE[1] = splitE[1].replace(/^\s+/, "");
      splitE[splitE.length - 1] = splitE[splitE.length - 1].replace(/\s+$/, "");
      cache[splitE[0]] = splitE.slice(1).join(":");
    }
  });
  return cache;
};
