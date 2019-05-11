import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import { DEFAULT_NODE, getLetterCount, checkExcessText } from "../../helpers";
import SideMenu from "../side-menu";
import Embed from "../embed";
import schema from "../schema";

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

const Image = ({ attributes, data }) => (
  <img
    src={data.get("src")}
    {...attributes}
    style={{ width: "100%", boxSizing: "border-box" }}
  />
);

const Paragraph = ({ attributes, children }) => (
  <p {...attributes}>{children}</p>
);

const VideoEmbed = ({ attributes, data, editor }) => (
  <Embed {...attributes} editor={editor} data={data} />
);

const Highlight = ({ attributes, children }) => (
  <span {...attributes} style={{ backgroundColor: "#ff00595e" }}>
    {children}
  </span>
);
const DEFAULT_COMPONENTS = {
  image: Image,
  paragraph: Paragraph,
  embed: VideoEmbed,
  highlight: Highlight
};

/**
 * The bottom menu example.
 *
 * @type {Component}
 */
export default class ReactSlateSmallEditor extends React.Component {
  static defaultProps = {
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

    sideMenu.style.opacity = 1;
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { value, placeholder, readOnly, className, style } = this.props;
    return (
      <Editor
        className={className}
        style={style}
        ref={ref => (this.editor = ref)}
        readOnly={readOnly}
        placeholder={placeholder || "Enter some text..."}
        value={value || Value.create(EMPTY_VALUE)}
        onChange={this.onChange}
        renderEditor={this.renderEditor}
        renderNode={this.renderNode}
        renderMark={this.renderMark}
        onKeyUp={this.onKeyUp}
        schema={schema}
      />
    );
  }

  /**
   * Render the editor.
   *
   * @param {Object} props
   * @param {Function} next
   * @return {Element}
   */

  renderEditor = (props, editor, next) => {
    const {
      readOnly,
      onFileSelected,
      maxCharacterCount,
      renderCount
    } = this.props;
    const children = next();

    const showCharacterCount = maxCharacterCount > 0 && !readOnly;
    let lettersCount = 0;
    if (showCharacterCount) lettersCount = getLetterCount(editor);

    return (
      <>
        <div>{children}</div>
        <SideMenu
          ref={this.sideMenu}
          editor={editor}
          onFileSelected={onFileSelected}
        />

        {showCharacterCount && renderCount(lettersCount)}
      </>
    );
  };

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = (props, editor, next) => {
    const { attributes, node, children, isFocused } = props;
    const { components } = this.props;
    const Component = components[node.type] || DEFAULT_COMPONENTS[node.type];

    if (!Component) {
      console.error(
        `There's no component for node: ${node.type}, SKIPPING node`
      );
      return next();
    }

    return (
      <Component
        attributes={attributes}
        data={node.data}
        editor={editor}
        selected={isFocused}
      >
        {children}
      </Component>
    );
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;
    const { components = {} } = this.props;
    const Component = components[mark.type] || DEFAULT_COMPONENTS[mark.type];

    if (!Component) {
      return next();
    }

    return <Component attributes={attributes}>{children}</Component>;
  };

  /**
   * On change.
   *
   * @param {Editor} editor
   */

  onChange = change => {
    const { onChange } = this.props;
    onChange(change.value);
  };

  onKeyUp = (event, editor, next) => {
    const { maxCharacterCount, readOnly } = this.props;
    const showCharacterCount = maxCharacterCount > 0 && !readOnly;
    if (showCharacterCount) checkExcessText(editor, maxCharacterCount);
    next();
  };
}
