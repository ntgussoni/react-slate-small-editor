import React from "react";
import DEFAULT_COMPONENTS from "./default-components";
/**
 * Render a Slate mark.
 *
 * @param {Object} props
 * @param {Editor} editor
 * @param {Function} next
 * @return {Element}
 */

const renderMark = (props, editor, next) => {
  const { children, mark, attributes } = props;
  const { components } = editor.props;
  const Component = components[mark.type] || DEFAULT_COMPONENTS[mark.type];

  if (!Component) {
    console.error(`There's no component for mark: ${mark.type}, SKIPPING mark`);
    return next();
  }

  return <Component attributes={attributes}>{children}</Component>;
};

export default renderMark;
