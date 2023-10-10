import { ITaskboardData } from "./TaskBoard.types";

export enum TaskboardItemStatus {
  TO_DO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export const defaultItems = {
  [TaskboardItemStatus.TO_DO]: [],
  [TaskboardItemStatus.IN_PROGRESS]: [],
  [TaskboardItemStatus.DONE]: [],
} as ITaskboardData;
