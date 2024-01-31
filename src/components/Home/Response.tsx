import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { RxCopy } from "react-icons/rx";
import { useAppSelector } from "@/store/hook";

export default function Response() {
  const status = useAppSelector((state) => state.response.status);

  const [tabSelect, setTabSelect] = useState(0);

  const tab = [
    {
      id: 0,
      label: `Content`,
    },
    {
      id: 1,
      label: "Headers",
    },
    {
      id: 2,
      label: "Raw",
    },
    {
      id: 3,
      label: "JSON",
    },
    {
      id: 4,
      label: "Timings",
    },
  ];

  return (
    <div className="flex flex-col mt-5">
      <h5 className="flex gap-[20px] text-[#6c757d] font-[500]">
        <div className="flex gap-2">
          <span>Status:</span>
          <span className={`text-[#278800]`}>
            {status} (
            {status === 200 ? "OK" : status === 404 ? "Not Found" : ""})
          </span>
        </div>
        <div className="flex gap-2">
          <span>Time:</span>
          <span></span>
        </div>
        <div className="flex gap-2">
          <span>Size:</span>
          <span></span>
        </div>
      </h5>
      <div className="mt-[25px]">
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
      <div className="relative">
        <CodeMirror
          className="mt-5 text-[16px]"
          height="300px"
          basicSetup={{
            highlightActiveLineGutter: false,
            highlightActiveLine: false,
            lineNumbers: false,
          }}
          readOnly={true}
          value={""}
        />
        <div
          className="absolute bottom-1 right-4 cursor-pointer btn-copy"
          onClick={() => navigator.clipboard.writeText}
        >
          <RxCopy size={25} />
        </div>
      </div>
    </div>
  );
}
