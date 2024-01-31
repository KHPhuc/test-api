import {
  StreamLanguage,
  StringStream,
  LanguageSupport,
} from "@codemirror/language";

export const HeaderStoreLanguage = StreamLanguage.define({
  name: "header",
  startState: () => {
    return {};
  },
  token: (stream: StringStream, state: any = {}): string | null => {
    if (stream.match(/^[\w\d-]+:{1}/g)) {
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

export const HeaderStoreCompletion = HeaderStoreLanguage.data.of({});

export const HeaderStore = () => {
  return new LanguageSupport(HeaderStoreLanguage, [HeaderStoreCompletion]);
};
