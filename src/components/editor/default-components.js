import React from "react";
import Embed from "../embed";

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
  <mark {...attributes} style={{ backgroundColor: "#ff00595e" }}>
    {children}
  </mark>
);

const DEFAULT_COMPONENTS = {
  image: Image,
  paragraph: Paragraph,
  embed: VideoEmbed,
  highlight: Highlight
};

export default DEFAULT_COMPONENTS;
