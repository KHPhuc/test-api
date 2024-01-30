import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import {
  StreamLanguage,
  StringStream,
  LanguageSupport,
} from "@codemirror/language";
import { useAppSelector } from "@/store/hook";

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

export default function RawTab() {
  // const dispatch = useAppDispatch();

  const raw = useAppSelector((state) => state.raw.raw);

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
        readOnly={true}
        placeholder={"Please enter a valid URL to see request details"}
        value={raw}
      />
    </div>
  );
}
