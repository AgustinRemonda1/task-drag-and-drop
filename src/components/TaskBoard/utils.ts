import { ITaskItem, DragDrop, Dropabble } from "./TaskBoard.types";

export const generateId = () => Date.now().toString();

export const deletePreviousState = (
  previousState: ITaskItem[],
  source: Dropabble
) => {
  return previousState.filter(
    (item: ITaskItem, index: number) => index !== source.index
  );
};

interface IUpdatePositionState extends DragDrop {
  taskList: ITaskItem[];
}

export const updatePositionState = ({
  taskList,
  source,
  destination,
}: IUpdatePositionState) => {
  const destinationPosition = taskList[source.index];
  const sourcePosition = taskList[destination.index];

  taskList[destination.index] = destinationPosition;
  taskList[source.index] = sourcePosition;

  return taskList;
};
