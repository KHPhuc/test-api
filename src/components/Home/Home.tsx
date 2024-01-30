import { useAppSelector } from "@/store/hook";

import { Button, Input, Select } from "antd";
import { useState } from "react";

import { GoShareAndroid } from "react-icons/go";
import { VscSymbolColor } from "react-icons/vsc";
import ContentTab from "./ContentTab";
import AuthorizationTab from "./AuthorizationTab";
import Headers from "./HeadersTab";
import RawTab from "./RawTab";

export default function Home() {
  const lineContent = useAppSelector((state) => state.content.lineNumbers);

  const [isSelectMethod, setIsSelectMethod] = useState(false);
  const [tabSelect, setTabSelect] = useState(2);

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

  const features = [
    {
      id: 0,
      tooltip: "Share",
      icon: GoShareAndroid,
      onclick: () => {},
    },
    {
      id: 0,
      tooltip: "Switch theme",
      icon: VscSymbolColor,
      onclick: () => {},
    },
  ];

  return (
    <div>
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
      <div className="flex flex-col">
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
          <div className="">
            {features.map((_, i) => {
              return <div key={i} className="button"></div>;
            })}
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
    </div>
  );
}
