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
    wrapperClassname,
    onFileSelected,
    maxCharacterCount,
    renderCount,
    sideMenu: sideMenuRef
  } = props;

  const children = next();

  const showCharacterCount = maxCharacterCount > 0 && !readOnly;
  let lettersCount = 0;
  if (showCharacterCount) lettersCount = getLetterCount(editor);

  return (
    <div className={wrapperClassname}>
      <>{children}</>
      <>{showCharacterCount && renderCount(lettersCount)}</>

      <>
        <SideMenu
          ref={sideMenuRef}
          editor={editor}
          onFileSelected={onFileSelected}
        />
      </>
    </div>
  );
};

export default renderEditor;
