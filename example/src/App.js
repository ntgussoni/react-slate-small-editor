import React, { Component } from "react";

import initialValue from "./initial-value.json";

import {
  ReactSlateSmallEditor,
  Value,
  KeyUtils
} from "react-slate-small-editor";

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class App extends Component {
  constructor(props) {
    super(props);
    KeyUtils.resetGenerator(); // This is for SSR
    this.state = {
      value: Value.fromJSON(initialValue)
    };
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const maxCharacterCount = 150;
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
          <ReactSlateSmallEditor
            onChange={this.onChange}
            value={value}
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
        </div>
      </div>
    );
  }
}
