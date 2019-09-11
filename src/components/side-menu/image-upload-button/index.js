import React from "react";
import { ReactComponent as ImageIcon } from "../../../assets/icons/image-regular.svg";
import { insertImage, setData } from "../../../helpers";
import { Button, Icon } from "../Button";

export default class ImageUploadButton extends React.Component {
  handleFileSelection = e => {
    const { onFileSelected, editor } = this.props;
    const [file] = e.target.files;
    const newNode = editor.query(insertImage, { file }, null);
    if (onFileSelected) {
      onFileSelected(file).then(url => {
        // Should probably delegate this to the image component
        if (editor.value.document.getNode(newNode.key)) {
          editor.command(setData, newNode, { src: url, isLoading: false });
        }
      });
    }
  };

  render() {
    return (
      <>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={ref => (this.uploadInput = ref)}
          onChange={e => this.handleFileSelection(e)}
        />
        <Button
          delay={50}
          reversed
          onMouseDown={() => this.uploadInput.click()}
        >
          <Icon>
            <ImageIcon />
          </Icon>
        </Button>
      </>
    );
  }
}
