import React, { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "antd";
import TaskCard from "./TaskCard";
import { DroppableContent, TaskboardContainer } from "./TaskColumn.styled";
import { ITaskColumnProps } from "./TaskColumn.types";

const TaskColumn: FC<ITaskColumnProps> = ({
  items,
  status,
  onClickAdd,
  onEdit,
  onDelete,
}) => {
  console.log(items);
  return (
    <TaskboardContainer
      title={`${status} (${items.length})`}
      extra={
        onClickAdd && (
          <Button type="primary" onClick={onClickAdd}>
            Añadir
          </Button>
        )
      }
    >
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <DroppableContent
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => {
              if (!item) return;
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      key={item.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        item={item}
                        status={status}
                        isDragging={snapshot.isDragging}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </DroppableContent>
        )}
      </Droppable>
    </TaskboardContainer>
  );
};

export default TaskColumn;
