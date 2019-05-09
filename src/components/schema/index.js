import { Block } from "slate";
import { DEFAULT_NODE } from "../../helpers";

/**
 * The editor's schema.
 *
 * @type {Object}
 */

const schema = {
  document: {
    last: { type: "paragraph" },
    marks: [{ type: "highlight" }],
    nodes: [
      {
        match: [{ type: DEFAULT_NODE }, { type: "image" }, { type: "embed" }]
      }
    ],
    normalize: (editor, { code, node, child, mark }) => {
      console.log("ERROR", code, mark);
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create(DEFAULT_NODE);
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
        case "child_type_invalid": {
          editor.setNodeByKey(child.key, DEFAULT_NODE);
          return;
        }
      }
    }
  },
  blocks: {
    image: {
      isVoid: true
    },
    embed: {
      isVoid: true
    }
  }
};

export default schema;
