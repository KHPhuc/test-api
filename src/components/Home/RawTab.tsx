import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RawStore } from "@/libs/RawStore/RawStore";
import { setLineRaw } from "@/store/raw/raw";
import { useEffect } from "react";

export default function RawTab() {
  const dispatch = useAppDispatch();

  const raw = useAppSelector((state) => state.raw.raw);

  useEffect(() => {
    //dispatch(generateRaw());
  }, []);

  const customTheme = createTheme({
    theme: "light",
    settings: {},
    styles: [
      {
        tag: t.keyword,
        color: "#708",
      },
      {
        tag: t.atom,
        color: "#219",
      },
      {
        tag: t.string,
        color: "#a11",
      },
      {
        tag: t.link,
        color: "#f50",
      },
      {
        tag: t.comment,
        color: "#f00",
      },
    ],
  });
  return (
    <div>
      <CodeMirror
        height="300px"
        basicSetup={{
          highlightActiveLineGutter: false,
          highlightActiveLine: false,
          lineNumbers: false,
          foldGutter: false,
        }}
        className="text-[16px]"
        extensions={[RawStore()]}
        theme={customTheme}
        readOnly={true}
        placeholder={"Please enter a valid URL to see request details"}
        value={raw}
        onChange={(e, editor: any) => {
          if (e === "") {
            dispatch(setLineRaw(0));
          } else {
            dispatch(setLineRaw(editor.state.doc.text.length));
          }
        }}
      />
    </div>
  );
}
