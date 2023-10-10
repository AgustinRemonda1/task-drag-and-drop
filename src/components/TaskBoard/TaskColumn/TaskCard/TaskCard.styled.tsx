import { Card, Typography, Menu } from "antd";
import { red } from "@ant-design/colors";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
`;

export const TaskCardTitle = styled(Typography.Title)`
  white-space: pre-wrap;
  margin-right: 0.25rem;
`;

export const DeleteMenuItem = styled(Menu.Item)`
  color: ${red.primary};
`;
