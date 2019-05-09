# react-slate-small-editor

> WYSIWYG Medium-like editor for react

[![NPM](https://img.shields.io/npm/v/react-slate-small-editor.svg)](https://www.npmjs.com/package/react-slate-small-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## WORK IN PROGRESS

## Install

```bash
npm install --save react-slate-small-editor
```

## Usage

```jsx
import React, { Component } from "react";
import { ReactSlateSmallEditor } from "react-slate-small-editor";

class Example extends Component {
  state = {
    value: null
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <ReactSlateSmallEditor
        onChange={this.onChange}
        value={value}
        onFileSelected={file => someFunction(file)}
      />
    );
  }
}
```

## License

MIT © [ntgussoni](https://github.com/ntgussoni)
