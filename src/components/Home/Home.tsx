import { useAppDispatch, useAppSelector } from "@/store/hook";

import { Button, Dropdown, Input, Select, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

import { TbArrowsRightLeft } from "react-icons/tb";
import { RiArrowDownSFill } from "react-icons/ri";
import { RxMagicWand } from "react-icons/rx";
import ContentTab from "./ContentTab";
import AuthorizationTab from "./AuthorizationTab";
import Headers from "./HeadersTab";
import RawTab from "./RawTab";
import GenerateCode from "./GenerateCode";
import Response from "./Response";
import Sidebar from "../Sidebar/Sidebar";
import { makeRequest, setMethod, setUrl } from "@/store/request/request";
import { toast } from "react-toastify";
import {
  generateRawAuth,
  generateRawContent,
  generateRawHeaders,
  generateRawUrl,
  setLineRaw,
  setRaw,
} from "@/store/raw/raw";

export default function Home() {
  const dispatch = useAppDispatch();
  const inputRef: any = useRef();

  const lineContent = useAppSelector((state) => state.content.lineNumbers);
  const lineHeader = useAppSelector((state) => state.headers.lineHeader);
  const lineRaw = useAppSelector((state) => state.raw.lineRaw);
  const isOpenGenerateCode = useAppSelector(
    (state) => state.system.isOpenGenerateCode
  );
  const isOpenResponse = useAppSelector((state) => state.system.isOpenResponse);

  const [isSelectMethod, setIsSelectMethod] = useState(false);
  const [tabSelect, setTabSelect] = useState(0);

  const url = useAppSelector((state) => state.request.url);
  const method = useAppSelector((state) => state.request.method);
  const contentType = useAppSelector((state) => state.content.contentType);
  const content = useAppSelector((state) => state.content.content);
  const authType = useAppSelector((state) => state.authorization.authType);
  const auth = useAppSelector((state) => state.authorization.auth);
  const headers = useAppSelector((state) => state.headers.headers);

  const rawUrl = useAppSelector((state) => state.raw.rawUrl);
  const rawAuth = useAppSelector((state) => state.raw.rawAuthorization);
  const rawHost = useAppSelector((state) => state.raw.rawHost);
  const rawHeaders = useAppSelector((state) => state.raw.rawHeaders);
  const rawContent = useAppSelector((state) => state.raw.rawContent);

  const tab = [
    {
      id: 0,
      label: `Content${lineContent !== 0 ? " (" + lineContent + ")" : ""}`,
    },
    {
      id: 1,
      label: "Authorization",
    },
    {
      id: 2,
      label: `Headers${lineHeader !== 0 ? " (" + lineHeader + ")" : ""}`,
    },
    {
      id: 3,
      label: `Raw${lineRaw !== 0 ? " (" + lineRaw + ")" : ""}`,
    },
  ];

  useEffect(() => {
    dispatch(generateRawUrl(url, method));
  }, [url, method, dispatch]);

  useEffect(() => {
    dispatch(generateRawAuth(authType, auth));
  }, [authType, auth, dispatch]);

  useEffect(() => {
    dispatch(generateRawHeaders(headers));
  }, [headers, dispatch]);

  useEffect(() => {
    dispatch(generateRawContent(contentType, content));
  }, [contentType, content, dispatch]);

  useEffect(() => {
    let rawPre = "";
    if (rawUrl !== "") {
      rawPre += rawUrl;
      if (rawAuth !== "") {
        rawPre += "\n" + rawAuth;
      }
      rawPre += "\n" + rawHost;
      if (rawHeaders !== "") {
        rawPre += "\n" + rawHeaders;
      }
      if (rawContent !== "") {
        rawPre += "\n\n" + rawContent;
      }
      const line = rawPre.split("\n").length;
      dispatch(setLineRaw(line));
    }
    dispatch(setRaw(rawPre));
  }, [rawUrl, rawAuth, rawHost, rawHeaders, rawContent, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className={`p-[20px] box-border w-full pl-[270px]`}>
        <header
          className="pb-2 mb-3"
          style={{
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <h1>Online API Testing Tool</h1>
          <span>This is an online API testing tool fro REST APIs.</span>
        </header>
        {/* Request */}
        <div
          className="flex flex-col pb-5"
          style={{
            borderBottom: "1px solid #dee2e6",
          }}
        >
          {/* Input url and button */}
          <div className="flex gap-[0.5rem] mt-[4px] mb-[30px]">
            <Input
              ref={inputRef}
              placeholder="https://google.com"
              size="large"
              onChange={(e) => dispatch(setUrl(e.target.value))}
            />
            <Select
              style={{
                width: isSelectMethod ? "135px" : "",
              }}
              size="large"
              options={[
                { value: "get", label: "GET" },
                { value: "post", label: "POST" },
                { value: "put", label: "PUT" },
                { value: "patch", label: "PATCH" },
                { value: "delete", label: "DELETE" },
                {
                  value: "head",
                  label: "HEAD",
                },
                {
                  value: "options",
                  label: "OPTIONS",
                },
              ]}
              onDropdownVisibleChange={(e) => setIsSelectMethod(e)}
              value={method}
              onChange={(e) => dispatch(setMethod(e))}
            />
            <Button
              type="primary"
              size="large"
              style={{ width: 120 }}
              onClick={() => {
                if (
                  url === "" ||
                  (!url
                    .trim()
                    .match(/^https:\/{2}([\w\d-]+\.{1})([\w\d-]+\.*){1,}.*$/) &&
                    !url
                      .trim()
                      .match(/^http:\/{2}([\w\d-]+\.{1})([\w\d-]+\.*){1,}.*$/))
                ) {
                  toast.error("Please enter a correct URL and try again.");
                  inputRef.current.focus();
                } else {
                  console.log("Xuoonsg");
                  dispatch(
                    makeRequest({
                      url,
                      method,
                      content,
                      contentType,
                      auth,
                      authType,
                      headers,
                    })
                  );
                }
              }}
            >
              Send
            </Button>
          </div>

          {/* Tab custom payload, header */}
          <div className="flex justify-between mb-[25px]">
            {/* Tab */}
            <div>
              {tab.map((e, i) => {
                return (
                  <button
                    key={i}
                    className={`button ${tabSelect === e.id ? "active" : ""}`}
                    onClick={() => setTabSelect(e.id)}
                  >
                    {e.label}
                  </button>
                );
              })}
            </div>
            {/* Another feartures: share, theme, gen code, tem, save */}
            <div className="flex gap-[5px]">
              {/* Button generate code */}
              <Tooltip
                title="Share"
                color="#7c7c7c"
                placement="bottom"
                arrow={false}
              >
                <Dropdown
                  trigger={["click"]}
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: <a>PHP</a>,
                      },
                      {
                        key: "2",
                        label: <a>JavaScript</a>,
                      },
                      {
                        key: "3",
                        label: <a>Node.js</a>,
                      },
                      {
                        key: "4",
                        label: <a>Python</a>,
                      },
                      {
                        key: "5",
                        label: <a>Java</a>,
                      },
                      {
                        key: "6",
                        label: <a>C#/.NET</a>,
                      },
                      {
                        key: "7",
                        label: <a>Curl/Bash</a>,
                      },
                    ],
                  }}
                >
                  <Button
                    className="flex items-center"
                    type="default"
                    style={{
                      borderWidth: 0,
                      boxShadow: "none",
                    }}
                  >
                    <RxMagicWand size={24} />
                    <RiArrowDownSFill size={15} />
                  </Button>
                </Dropdown>
              </Tooltip>
              {/* Button sample request */}
              <Tooltip
                title="Sample HTTP request"
                color="#7c7c7c"
                placement="bottom"
                arrow={false}
              >
                <Button
                  type="default"
                  style={{
                    borderWidth: 0,
                    boxShadow: "none",
                  }}
                >
                  <TbArrowsRightLeft size={24} />
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Body tab */}
          {tabSelect === 0 ? (
            <ContentTab />
          ) : tabSelect === 1 ? (
            <AuthorizationTab />
          ) : tabSelect === 2 ? (
            <Headers />
          ) : tabSelect === 3 ? (
            <RawTab />
          ) : null}
        </div>

        {isOpenGenerateCode ? <GenerateCode /> : null}

        {isOpenResponse ? <Response /> : null}
      </div>
    </div>
  );
}
