import React, { Fragment } from "react";
import { ReactComponent as VideoIcon } from "../../../assets/icons/video-plus-regular.svg";
import { insertVideo, setData } from "../../../helpers";
import styled from "styled-components";

export default class ImageUploadButton extends React.Component {
  handleFileSelection = e => {
    const { onFileSelected, editor } = this.props;
    const [file] = e.target.files;
    const newNode = editor.query(insertVideo, { file }, null);
    if (onFileSelected) {
      onFileSelected(file).then(url => {
        // Should probably delegate this to the image component
        if (editor.value.document.getNode(newNode.key)) {
          editor.command(setData, newNode, { src: url });
        }
      });
    }
  };

  render() {
    return (
      <Fragment>
        <input
          style={{ display: "none" }}
          type="file"
          ref={ref => (this.uploadInput = ref)}
          onChange={e => this.handleFileSelection(e)}
        />
        <Button reversed onMouseDown={() => this.uploadInput.click()}>
          <Icon>
            <VideoIcon />
          </Icon>
        </Button>
      </Fragment>
    );
  }
}

const Button = styled.span`
  cursor: pointer;
  background: white;

  &:hover {
    svg {
      color: #ccc;
    }
  }
`;

const Icon = styled.span`
  vertical-align: text-bottom;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 17px;
    box-sizing: content-box;
    background-size: cover;
    color: ${props => (props.active ? "#ccc" : "#000")};
  }
`;
