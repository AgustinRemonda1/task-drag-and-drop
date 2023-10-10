import { ITaskItem } from "components/TaskBoard/TaskBoard.types";
import { TaskboardItemStatus } from "components/TaskBoard/TaskBoard.config";

export interface ITaskCardProps {
  item: ITaskItem;
  isDragging: boolean;
  status: TaskboardItemStatus;
  onEdit: (itemToEdit: ITaskItem) => void;
  onDelete: (args: {
    status: TaskboardItemStatus;
    itemToDelete: ITaskItem;
  }) => void;
}
