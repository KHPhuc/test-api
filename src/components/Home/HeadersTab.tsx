import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setHeaders, setLineHeader } from "@/store/headers/headers";
import { HeaderStore } from "@/libs/HeaderStore/HeaderStore";

export default function HeadersTab() {
  const dispatch = useAppDispatch();

  const headers = useAppSelector((state) => state.headers.headers);

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
        extensions={[HeaderStore()]}
        theme={customTheme}
        placeholder={
          "Cache-Control: no-cache, no-store, must-revalidate\nPragma: no-cache\nExpires: 0"
        }
        value={headers}
        onChange={(e, editor: any) => {
          if (e === "") {
            dispatch(setLineHeader(0));
          } else {
            dispatch(setLineHeader(editor.state.doc.text.length));
          }
          let splitE = e.split("\n");
          let cacheE = e.split("\n");
          splitE.forEach((element: any, i:any) => {
            let splitElement = element.split(":");
            if (splitElement[0].match(/\s+/)) {
              splitElement[0] = splitElement[0].replace(/\s+/, "");
            }
            cacheE[i] = splitElement.join(":");
          });
          dispatch(setHeaders(cacheE.join("\n")));
        }}
      />
    </div>
  );
}
