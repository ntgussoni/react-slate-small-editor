import React, { useState, useMemo, useEffect } from "react";

import initialValue from "./initial-value.json";

import {
  ReactSlateSmallEditor,
  Value,
  KeyUtils
} from "react-slate-small-editor";

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const App = () => {
  useEffect(() => {
    KeyUtils.resetGenerator(); // This is for SSR
  }, []);

  const maxCharacterCount = 150;

  const [value1, setValue1] = useState(Value.fromJSON(initialValue));
  const [value2, setValue2] = useState(Value.fromJSON(initialValue));

  const Editor1 = useMemo(
    () => (
      <ReactSlateSmallEditor
        onChange={setValue1}
        value={value1}
        maxCharacterCount={maxCharacterCount}
        onFileSelected={async () => {
          // Do your thing with the file
          await timeout(300);
          return "https://images.pexels.com/photos/459793/pexels-photo-459793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        }}
        renderCount={count => `${count} / ${maxCharacterCount}`}
        style={{
          border: "1px solid #121212",
          borderRadius: "6px",
          padding: "20px"
        }}
      />
    ),
    [value1]
  );
  const Editor2 = useMemo(
    () => (
      <ReactSlateSmallEditor
        onChange={setValue2}
        value={value2}
        maxCharacterCount={maxCharacterCount}
        onFileSelected={async () => {
          // Do your thing with the file
          await timeout(300);
          return "https://images.pexels.com/photos/459793/pexels-photo-459793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        }}
        renderCount={count => `${count} / ${maxCharacterCount}`}
        style={{
          border: "1px solid #121212",
          borderRadius: "6px",
          padding: "20px"
        }}
      />
    ),
    [value2]
  );

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          marginTop: "100px",
          display: "block",
          width: "50%"
        }}
      >
        {Editor1}
        {Editor2}
      </div>
    </div>
  );
};

export default App;
