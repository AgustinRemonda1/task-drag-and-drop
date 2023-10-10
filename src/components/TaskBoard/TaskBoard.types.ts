import { TaskboardItemStatus } from "./TaskBoard.config";

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
}

export type ITaskboardData = Record<TaskboardItemStatus, ITaskItem[]>;

export interface Dropabble {
  droppableId: TaskboardItemStatus;
  index: number;
}

export interface DragDrop {
  source: Dropabble;
  destination: Dropabble;
}
