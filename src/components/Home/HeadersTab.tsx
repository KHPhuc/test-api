import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import {
  StreamLanguage,
  StringStream,
  LanguageSupport,
} from "@codemirror/language";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setHeaders } from "@/store/headers/headers";

export const CustomStoreLanguage = StreamLanguage.define({
  name: "header",
  startState: () => {
    return {};
  },
  token: (stream: StringStream, state: any = {}): string | null => {
    if (stream.match(/^[\w\d\s]+:{1}/g)) {
      state.key = true;
      return "atom";
    }
    if (stream.match(/(?:.*)$/)) {
      if (state.key !== undefined && state.key) {
        state.key = undefined;
        return "string";
      } else return "comment";
    }

    stream.next();
    return "comment";
  },
  blankLine: (): void => {},
  copyState: () => {},
  indent: (): number | null => {
    return 0;
  },
});

export const CustomStoreCompletion = CustomStoreLanguage.data.of({});

export const customStore = () => {
  return new LanguageSupport(CustomStoreLanguage, [CustomStoreCompletion]);
};

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
        extensions={[customStore()]}
        theme={customTheme}
        placeholder={
          "Cache-Control: no-cache, no-store, must-revalidate\nPragma: no-cache\nExpires: 0"
        }
        value={headers}
        onChange={(e) => dispatch(setHeaders(e))}
      />
    </div>
  );
}
