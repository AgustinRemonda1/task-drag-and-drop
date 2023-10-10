import styled from "styled-components";
import { Card } from "antd";
import { geekblue } from "@ant-design/colors";

export const TaskboardContainer = styled(Card)`
  user-select: none;
  flex: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  // To force each flex item to have equal width
  // even if they have long texts with no spaces etc.
  min-width: 0;
  > .ant-card-body {
    overflow: hidden;
    height: 100%;
    padding: 0;
  }
`;

interface DroppableRootProps {
  isDraggingOver: boolean;
}

export const DroppableContent = styled.div<DroppableRootProps>`
  height: 100%;
  overflow-y: auto;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? geekblue[2] : "#f0f0f0"};
`;
