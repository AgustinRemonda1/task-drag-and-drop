import { ITaskItem } from "../TaskBoard.types";
import { TaskboardItemStatus } from "../TaskBoard.config";
import { ITaskCardProps } from "./TaskCard/TaskCard.types";

export type ITaskColumnProps = Pick<ITaskCardProps, "onEdit" | "onDelete"> & {
  items: ITaskItem[];
  status: TaskboardItemStatus;
  onClickAdd?: VoidFunction;
};
