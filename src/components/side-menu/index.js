import React from "react";
import styled from "styled-components";
import { ReactComponent as VideoIcon } from "../../assets/icons/play-circle-regular.svg";
import ImageUploadButton from "./image-upload-button";
import VideoUploadButton from "./video-upload-button";
import { Button, Icon } from "./Button";

/**
 * Give the menu some styles.
 *
 * @type {Component}
 */

const StyledMenu = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  opacity: 0;
  left: 0;
  bottom: -42px;
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
    border: 1px solid #e3e3e3;
    border-radius: 50%;
  }
`;

const SideMenu = ({ onFileSelected, editor }, ref) => {
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
    <StyledMenu className="side-menu" ref={ref}>
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
