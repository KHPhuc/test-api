import {
  StreamLanguage,
  StringStream,
  LanguageSupport,
} from "@codemirror/language";

export const RawStoreLanguage = StreamLanguage.define({
  name: "raw",
  startState: () => {
    return {};
  },
  token: (stream: StringStream, state: any = {}): string | null => {
    if (
      stream.match(/^GET/) ||
      stream.match(/^POST/) ||
      stream.match(/^PUT/) ||
      stream.match(/^PATCH/) ||
      stream.match(/^DELETE/) ||
      stream.match(/^HEAD/) ||
      stream.match(/^OPTIONS/)
    ) {
      state.firstLine = true;
      return "keyword";
    }
    if (stream.match(/\s+/)) {
      if (state.firstLine) {
        return null;
      }
    }
    if (stream.match(/(\/{1}[\w.\S]*)+/)) {
      if (state.firstLine) {
        return "link";
      }
    }
    if (stream.match("HTTP/1.1")) {
      if (state.firstLine) {
        state.firstLine = false;
        return "keyword";
      }
    }
    if (stream.match(/^[\w\d-]+:{1}/g)) {
      state.key = true;
      return "atom";
    }
    if (stream.match(/(?:.*)$/)) {
      if (state.key !== undefined && state.key) {
        state.key = undefined;
        return "string";
      } else return null;
    }

    stream.next();
    return null;
  },
  blankLine: (): void => {},
  copyState: () => {},
  indent: (): number | null => {
    return 0;
  },
});

export const RawStoreCompletion = RawStoreLanguage.data.of({});

export const RawStore = () => {
  return new LanguageSupport(RawStoreLanguage, [RawStoreCompletion]);
};
