import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import { DEFAULT_NODE, checkExcessText } from "../../helpers";
import schema from "../schema";
import renderEditor from "./render-editor";
import renderNode from "./render-node";
import renderMark from "./render-mark";

var EMPTY_VALUE = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: ""
              }
            ]
          }
        ]
      }
    ]
  }
};

/**
 * The bottom menu example.
 *
 * @type {Component}
 */
export default class ReactSlateSmallEditor extends React.Component {
  static defaultProps = {
    readOnly: false,
    maxCharacterCount: 0,
    renderCount: () => {},
    components: {}
  };
  /**
   * On update, update the menu.
   */

  sideMenu = React.createRef();

  componentDidUpdate = () => {
    this.updateSideMenu();
  };

  componentDidMount = () => {
    const { readOnly, maxCharacterCount } = this.props;
    if (!readOnly) checkExcessText(this.editor, maxCharacterCount);
  };

  /**
   * Update the menu's absolute position.
   */

  updateSideMenu = () => {
    const { value, readOnly } = this.props;
    if (readOnly) return;

    const sideMenu = this.sideMenu.current;
    if (!sideMenu) return;

    if (!value) return;
    const { selection, blocks, texts } = value;

    if (!selection) return;

    if (selection.isBlurred || selection.isExpanded) {
      sideMenu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();

    if (native.rangeCount === 0) {
      sideMenu.removeAttribute("style");
      return;
    }
    const topBlock = blocks.get(0);
    const notAParagraph = topBlock && topBlock.type !== DEFAULT_NODE;
    const notEmptyText =
      texts && texts.get(0) && texts.get(0).text.length !== 0;

    if (notAParagraph || notEmptyText) {
      sideMenu.removeAttribute("style");
      return;
    }

    sideMenu.style.display = "flex";
    sideMenu.style.opacity = 1;
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const {
      value,
      placeholder,
      readOnly,
      className,
      style,
      onFileSelected,
      maxCharacterCount,
      renderCount,
      components
    } = this.props;
    return (
      <Editor
        wrapperClassname={className}
        style={style}
        ref={ref => (this.editor = ref)}
        readOnly={readOnly}
        placeholder={placeholder || "Enter some text..."}
        value={value || Value.create(EMPTY_VALUE)}
        onChange={this.onChange}
        renderEditor={renderEditor}
        renderNode={renderNode}
        renderMark={renderMark}
        onKeyDown={this.onKeyDown}
        schema={schema}
        onFileSelected={onFileSelected}
        maxCharacterCount={maxCharacterCount}
        renderCount={renderCount}
        components={components}
        sideMenu={this.sideMenu}
      />
    );
  }

  /**
   * On change.
   *
   * @param {Editor} editor
   */

  onChange = change => {
    const { onChange } = this.props;
    onChange(change.value);
  };

  onKeyDown = (event, editor, next) => {
    next();
    setTimeout(() => {
      const { maxCharacterCount, readOnly } = editor.props;
      const showCharacterCount = maxCharacterCount > 0 && !readOnly;
      if (showCharacterCount) checkExcessText(editor, maxCharacterCount);
    }, 0);
  };
}
