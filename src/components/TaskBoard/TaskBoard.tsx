import { DragDropContext } from "react-beautiful-dnd";
import TaskboardItemFormModal from "./TaskCreator/TaskCreator";
import TaskboardCol from "./TaskColumn/TaskColumn";
import { TaskboardContainer, TaskboardContent } from "./TaskBoard.styled";
import { TaskboardItemStatus } from "./TaskBoard.config";
import useTaskboard from "./useTaskBoard";
import useTaskCreator from "./useTaskCreator";

const Taskboard = () => {
  const { state, actions } = useTaskboard();
  const tableCreator = useTaskCreator({
    tasksByStatus: state.tasksByStatus,
    onChangeTask: actions.onChangeTask,
  });

  return (
    <>
      <DragDropContext onDragEnd={actions.onDragEnd}>
        <TaskboardContainer>
          <TaskboardContent>
            {Object.values(TaskboardItemStatus).map((status) => (
              <TaskboardCol
                key={status}
                status={status}
                items={state.tasksByStatus[status]}
                onClickAdd={
                  status === TaskboardItemStatus.TO_DO
                    ? () => tableCreator.actions.onOpenCreator(null)
                    : undefined
                }
                onEdit={tableCreator.actions.onOpenCreator}
                onDelete={actions.onDelete}
              />
            ))}
          </TaskboardContent>
        </TaskboardContainer>
      </DragDropContext>
      <TaskboardItemFormModal
        visible={tableCreator.state.isCreatorModalOpened}
        onCancel={tableCreator.actions.onCloseCreator}
        onSubmit={tableCreator.actions.onNewTask}
        initialValues={tableCreator.state.initialItem}
      />
    </>
  );
};

export default Taskboard;
