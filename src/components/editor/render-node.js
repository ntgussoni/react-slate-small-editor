import React from "react";
import DEFAULT_COMPONENTS from "./default-components";
/**
 * Render a Slate node.
 *
 * @param {Object} props
 * @return {Element}
 */

const renderNode = (props, editor, next) => {
  const { attributes, node, children, isFocused } = props;
  const { components } = editor.props;
  const Component = components[node.type] || DEFAULT_COMPONENTS[node.type];

  if (!Component) {
    console.error(`There's no component for node: ${node.type}, SKIPPING node`);
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

export default renderNode;
