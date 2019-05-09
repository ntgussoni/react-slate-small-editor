import React from "react";
import { ReactComponent as VideoIcon } from "../../assets/icons/video-plus-regular.svg";

import ImageUploadButton from "./image-upload-button";
import VideoUploadButton from "./video-upload-button";

import styled from "styled-components";

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

/**
 * Give the menu some styles.
 *
 * @type {Component}
 */

const StyledMenu = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  opacity: 0;
  left: 0;
  bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  > span {
    position: relative;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    margin-left: 10px;
  }
`;

export default class SideMenu extends React.Component {
  state = {
    ssrDone: false
  };

  componentDidMount() {
    this.setState({ ssrDone: true });
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { className, innerRef, onFileSelected, editor } = this.props;
    const { ssrDone } = this.state;

    if (!ssrDone) {
      return null;
    }

    return (
      <StyledMenu className={className} ref={innerRef}>
        <ButtonContainer>
          <ImageUploadButton editor={editor} onFileSelected={onFileSelected} />
          <VideoUploadButton editor={editor} onFileSelected={onFileSelected} />
          {this.renderButton("video", VideoIcon, 150)}
        </ButtonContainer>
      </StyledMenu>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderButton(type, Image) {
    return (
      <Button reversed onMouseDown={event => this.onButtonClick(event, type)}>
        <Icon>
          <Image />
        </Icon>
      </Button>
    );
  }

  onButtonClick = (e, type) => {
    e.preventDefault();
    const { editor } = this.props;
    if (type === "video") {
      editor.setBlocks("embed");
    }
  };
}
