import React from "react";
import { getLetterCount } from "../../helpers";
import SideMenu from "../side-menu";

/**
 * Render the editor.
 *
 * @param {Object} props
 * @param {Function} next
 * @return {Element}
 */
const renderEditor = (props, editor, next) => {
  const {
    readOnly,
    className,
    onFileSelected,
    maxCharacterCount,
    renderCount,
    sideMenu
  } = props;

  const children = next();

  const showCharacterCount = maxCharacterCount > 0 && !readOnly;
  let lettersCount = 0;
  if (showCharacterCount) lettersCount = getLetterCount(editor);

  return (
    <div className={className}>
      <div>{children}</div>
      <SideMenu
        ref={sideMenu}
        editor={editor}
        onFileSelected={onFileSelected}
      />

      {showCharacterCount && renderCount(lettersCount)}
    </div>
  );
};

export default renderEditor;
