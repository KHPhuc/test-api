import CodeMirror from "@uiw/react-codemirror";

export default function GenerateCode() {
  // const dispatch = useAppDispatch();

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
        // extensions={[customStore()]}
        readOnly={true}
        placeholder={"Please enter a valid URL to see request details"}
        // value={}
      />
    </div>
  );
}
