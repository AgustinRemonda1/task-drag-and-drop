import React from "react";
import Taskboard from "../TaskBoard/TaskBoard";
import { Container, StyledContent } from "./DragAndDropBoard.styled";

const DragAndDropBoard = () => {
  return (
    <Container>
      <StyledContent>
        <Taskboard />
      </StyledContent>
    </Container>
  );
};

export default DragAndDropBoard;
