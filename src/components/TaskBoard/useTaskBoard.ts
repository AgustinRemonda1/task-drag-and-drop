import { useCallback, useState } from "react";
import { produce } from "immer";
import { ITaskItem } from "./TaskBoard.types";
import { ITaskColumnProps } from "./TaskColumn/TaskColumn.types";
import { defaultItems } from "./TaskBoard.config";
import { ITaskboardData, DragDrop } from "./TaskBoard.types";
import { deletePreviousState, updatePositionState } from "./utils";

const useTaskboard = () => {
  const [tasksByStatus, setTasksByStatus] =
    useState<ITaskboardData>(defaultItems);

  const onDragEnd = useCallback(
    ({ source, destination }: DragDrop) => {
      if (!destination?.droppableId || !source?.droppableId) return;
      const taskSource = tasksByStatus[source.droppableId] as ITaskItem[];
      const taskDestination = tasksByStatus[
        destination.droppableId
      ] as ITaskItem[];

      const taskToChangeStatus = taskSource.find(
        (item, index) => index === source.index
      );

      if (
        taskToChangeStatus &&
        destination.droppableId !== source.droppableId
      ) {
        setTasksByStatus({
          ...tasksByStatus,
          [source.droppableId]: deletePreviousState(taskSource, source),
          [destination.droppableId]: [...taskDestination, taskToChangeStatus],
        });
      } else if (destination.droppableId === source.droppableId) {
        setTasksByStatus({
          ...tasksByStatus,
          [source.droppableId]: updatePositionState({
            taskList: taskSource,
            destination,
            source,
          }),
        });
      }
    },
    [tasksByStatus]
  );

  const onDelete = useCallback<ITaskColumnProps["onDelete"]>(
    ({ status, itemToDelete }) => {
      const taskRemoved = tasksByStatus[status].filter(
        (item) => item.id !== itemToDelete.id
      );

      setTasksByStatus({ ...tasksByStatus, [status]: taskRemoved });
    },
    [tasksByStatus]
  );

  const onChangeTask = useCallback((taskData: ITaskboardData) => {
    setTasksByStatus(taskData);
  }, []);

  return {
    state: { tasksByStatus },
    actions: { onDragEnd, onDelete, onChangeTask },
  };
};

export default useTaskboard;
