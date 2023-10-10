import styled from "styled-components";
import Layout, { Content } from "antd/lib/layout/layout";
import { gray } from "@ant-design/colors";

export const Container = styled(Layout)`
  /* We can't use "height: 100vh; width: 100vw;" here.
  Otherwise, when there is a horizontal scrollbar etc, 
  because that we set a constant height, there will be a vertical one too.  */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const StyledContent = styled(Content)`
  padding-top: 125px;
  background-color: #595959;
`;
