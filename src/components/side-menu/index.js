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
  display: none;
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

const SideMenu = ({ className, onFileSelected, editor }, ref) => {
  const onButtonClick = (e, type) => {
    e.preventDefault();
    if (type === "video") {
      editor.setBlocks("embed");
    }
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  return (
    <StyledMenu className={className} ref={ref}>
      <ButtonContainer>
        <ImageUploadButton editor={editor} onFileSelected={onFileSelected} />
        <VideoUploadButton editor={editor} onFileSelected={onFileSelected} />
        <Button reversed onMouseDown={event => onButtonClick(event, "video")}>
          <Icon>
            <VideoIcon />
          </Icon>
        </Button>
      </ButtonContainer>
    </StyledMenu>
  );
};

export default React.forwardRef(SideMenu);
