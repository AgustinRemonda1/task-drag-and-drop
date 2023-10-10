import { ITaskItem } from "../TaskBoard.types";
import { ModalProps } from "antd";

export type ITaskboardItemFormValues = Pick<ITaskItem, "title" | "description">;

export type ITaskCreatorProps = Pick<ModalProps, "visible"> & {
  initialValues: ITaskboardItemFormValues;
  onClose: VoidFunction;
  onSubmit: (values: ITaskboardItemFormValues) => void;
};
