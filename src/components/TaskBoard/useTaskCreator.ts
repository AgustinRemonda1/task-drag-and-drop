import { useCallback, useMemo, useState } from "react";
import { ITaskItem, ITaskboardData } from "./TaskBoard.types";
import { ITaskboardItemFormValues } from "./TaskCreator/TaskCreator.types";
import { TaskboardItemStatus } from "./TaskBoard.config";
import { generateId } from "./utils";

interface IUseTaskboard {
  tasksByStatus: ITaskboardData;
  onChangeTask: (taskData: ITaskboardData) => void;
}

const useTaskCreator = ({ tasksByStatus, onChangeTask }: IUseTaskboard) => {
  const [isCreatorModalOpened, setIsCreatorModalOpened] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ITaskItem | null>(null);

  const initialItem = useMemo<ITaskboardItemFormValues>(
    () => ({
      title: itemToEdit?.title || "",
      description: itemToEdit?.description || "",
    }),
    [itemToEdit]
  );

  const onNewTask = useCallback(
    (values) => {
      if (itemToEdit) {
        const statusToEdit = Object.values(TaskboardItemStatus).find((status) =>
          tasksByStatus[status].find((item) => item.id === itemToEdit.id)
        );
        if (statusToEdit) {
          const taskListEdited = tasksByStatus[statusToEdit].map((item) =>
            item.id === itemToEdit.id ? { id: item.id, ...values } : item
          );

          onChangeTask &&
            onChangeTask({ ...tasksByStatus, [statusToEdit]: taskListEdited });
        }
      } else {
        tasksByStatus[TaskboardItemStatus.TO_DO].push({
          ...values,
          id: generateId(),
        });
        onChangeTask && onChangeTask(tasksByStatus);
      }
    },
    [onChangeTask, itemToEdit, tasksByStatus]
  );

  const onOpenCreator = useCallback((itemToEdit: ITaskItem | null) => {
    setItemToEdit(itemToEdit);
    setIsCreatorModalOpened(true);
  }, []);

  const onCloseCreator = useCallback(() => {
    setItemToEdit(null);
    setIsCreatorModalOpened(false);
  }, []);

  return {
    state: { isCreatorModalOpened, initialItem },
    actions: { onOpenCreator, onCloseCreator, onNewTask },
  };
};

export default useTaskCreator;
