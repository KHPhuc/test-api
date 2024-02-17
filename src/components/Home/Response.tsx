import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { RxCopy } from "react-icons/rx";
import { useAppSelector } from "@/store/hook";
import { langs } from "@uiw/codemirror-extensions-langs";
import { HeaderStore } from "@/libs/HeaderStore/HeaderStore";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export default function Response() {
  const content = useAppSelector((state) => state.response.content);
  const headers = useAppSelector((state) => state.response.headers);
  const size = useAppSelector((state) => state.response.size);
  const time = useAppSelector((state) => state.response.time);
  const status = useAppSelector((state) => state.response.status);

  const [tabSelect, setTabSelect] = useState(0);

  const tab = [
    {
      id: 0,
      label: `Content${
        content.split("\n").length !== 0
          ? " (" + content.split("\n").length + ")"
          : ""
      }`,
    },
    {
      id: 1,
      label: `Headers${
        headers.split("\n").length !== 0
          ? " (" + headers.split("\n").length + ")"
          : ""
      }`,
    },
  ];

  const customTheme = createTheme({
    theme: "light",
    settings: {},
    styles: [
      {
        tag: t.atom,
        color: "#219",
      },
      {
        tag: t.string,
        color: "#a11",
      },
      {
        tag: t.comment,
        color: "#f00",
      },
    ],
  });

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
          <span>{time} ms</span>
        </div>
        <div className="flex gap-2">
          <span>Size:</span>
          <span>{size}</span>
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
            foldGutter: tabSelect === 0 ? true : false,
          }}
          extensions={[tabSelect === 0 ? langs.html() : HeaderStore()]}
          theme={tabSelect === 0 ? "none" : customTheme}
          readOnly={true}
          value={tabSelect === 0 ? content : headers}
        />

        <div
          className="absolute bottom-1 right-4 cursor-pointer btn-copy"
          onClick={() =>
            navigator.clipboard.writeText(tabSelect === 0 ? content : headers)
          }
        >
          <RxCopy size={25} />
        </div>
      </div>
    </div>
  );
}
