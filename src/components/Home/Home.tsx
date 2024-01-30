import { useAppSelector } from "@/store/hook";

import { Button, Dropdown, Input, Select, Tooltip } from "antd";
import { useState } from "react";

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

export default function Home() {
  const lineContent = useAppSelector((state) => state.content.lineNumbers);
  const isOpenGenerateCode = useAppSelector(
    (state) => state.system.isOpenGenerateCode
  );
  const isOpenResponse = useAppSelector((state) => state.system.isOpenResponse);

  const [isSelectMethod, setIsSelectMethod] = useState(false);
  const [tabSelect, setTabSelect] = useState(0);

  const [method, setMethod] = useState("DELETE");

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
      label: "Headers",
    },
    {
      id: 3,
      label: "Raw",
    },
  ];

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
            <Input placeholder="https://google.com" size="large" />
            <Select
              style={{
                width: isSelectMethod
                  ? 100
                  : method === "GET" || method === "PUT"
                  ? 80
                  : method === "POST"
                  ? 85
                  : method === "PATCH"
                  ? 95
                  : 100,
              }}
              size="large"
              options={[
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "PATCH", label: "PATCH" },
                { value: "DELETE", label: "DELETE" },
              ]}
              onDropdownVisibleChange={(e) => setIsSelectMethod(e)}
              value={method}
              onChange={(e) => setMethod(e)}
            />
            <Button type="primary" size="large" style={{ width: 120 }}>
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
