import {
  setContent,
  setContentType,
  setLineNumbers,
} from "@/store/content/content";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import { Select } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { linter, lintGutter } from "@codemirror/lint";
import { jsonParseLinter } from "@codemirror/lang-json";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useEffect, useState } from "react";

// Chưa check được content gửi đi có đúng định dạng không

export default function ContentTab() {
  const dispatch = useAppDispatch();

  const contentType = useAppSelector((state) => state.content.contentType);
  const content = useAppSelector((state) => state.content.content);

  const [placeholder, setPlaceholder] = useState(`{"key": "value"}`);

  useEffect(() => {
    switch (contentType) {
      case "FORM":
        setPlaceholder(`key1=value1\nkey2=value2`);
        break;
      case "JSON":
        setPlaceholder(`{"key": "value"}`);
        break;
      case "HTML":
        setPlaceholder(`<html></html>`);
        break;
      case "XML":
        setPlaceholder(`<data></data>`);
        break;
      case "TEXT":
        setPlaceholder("plain text");
        break;
      default:
        setPlaceholder("");
        break;
    }
  }, [contentType]);

  return (
    <div className="flex flex-col">
      <Select
        className="mb-3"
        options={[
          {
            value: "FORM",
            label: "FORM URL Encoded (application/x-www-form-urlencode)",
          },
          {
            value: "JSON",
            label: "JSON (application/json)",
          },
          {
            value: "HTML",
            label: "HTML (text/html)",
          },
          {
            value: "XML",
            label: "XML (application/xml)",
          },
          {
            value: "TEXT",
            label: "TEXT (text/plain)",
          },
          {
            value: "CUSTOM",
            label: "CUSTOM",
          },
        ]}
        value={contentType}
        onChange={(e) => dispatch(setContentType(e))}
      />
      <CodeMirror
        basicSetup={{
          highlightActiveLineGutter: false,
          highlightActiveLine: false,
        }}
        height="250px"
        extensions={
          content !== "" && contentType === "JSON"
            ? [langs.json(), lintGutter(), linter(jsonParseLinter())]
            : []
        }
        placeholder={placeholder}
        value={content}
        onChange={(e, editor: any) => {
          if (e === "") {
            dispatch(setLineNumbers(0));
          } else {
            dispatch(setLineNumbers(editor.state.doc.text.length));
          }
          dispatch(setContent(e));
        }}
      />
    </div>
  );
}
