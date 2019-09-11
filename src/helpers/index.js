import { Block } from "slate";
import imageExtensions from "../image-extensions";

export const DEFAULT_NODE = "paragraph";

/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor
 * @param {Object} file
 * @param {Range} target
 *
 */

export const insertImage = (editor, { file = null, type = "file" }, target) => {
  if (target) {
    editor.select(target);
  }

  let src = file;
  if (type === "file") {
    src = URL.createObjectURL(file);
  }

  const imageBlock = Block.create({
    type: "image",
    data: { src, isLoading: true }
  });

  editor.insertBlock(imageBlock);
  return imageBlock;
};

/**
 * A change function to standardize inserting videos.
 *
 * @param {Editor} editor
 * @param {Object} url
 * @param {Range} target
 *
 */

export const insertVideo = (editor, { file = null }, target) => {
  if (target) {
    editor.select(target);
  }

  const videoBlock = Block.create({
    type: "embed",
    data: { video: file }
  });

  editor.insertBlock(videoBlock);
  return videoBlock;
};

/*
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

export const isImage = url => {
  return !!imageExtensions.find(url.endsWith);
};

export const wrapLink = (editor, href) => {
  editor.wrapInline({
    type: "link",
    data: { href }
  });

  editor.moveToEnd();
};

export const setData = (editor, node, data) => {
  editor.setNodeByKey(node.key, { data: { ...node.data.toJS(), ...data } });
};

export const getData = (node, name, defaultValue = {}) => {
  return node.data.get(name) || defaultValue;
};

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {String} type
 * @return {Boolean}
 */

export const hasBlock = (editor, type) => {
  const { value } = editor;
  return value.blocks.some(node => node.type === type);
};

export const checkExcessText = (editor, maxCharacterCount) => {
  const { value } = editor;
  const texts = value.document.getTexts();
  const decorations = [];
  let count = 0;

  texts.forEach(node => {
    const { key, text } = node;
    count += text.length;

    if (count <= maxCharacterCount) return;

    const offset = count - maxCharacterCount;

    decorations.push({
      anchor: {
        key,
        offset: offset > text.length ? 0 : text.length - offset
      },
      focus: { key, offset: text.length },
      mark: { type: "highlight" }
    });
  });
  // Make the change to decorations without saving it into the undo history,
  // so that there isn't a confusing behavior when undoing.

  editor.withoutSaving(() => {
    editor.setDecorations(decorations);
  });
};

export const getLetterCount = editor => {
  const {
    value: { document }
  } = editor;
  return document.getBlocks().reduce((memo, b) => memo + b.text.length, 0);
};
