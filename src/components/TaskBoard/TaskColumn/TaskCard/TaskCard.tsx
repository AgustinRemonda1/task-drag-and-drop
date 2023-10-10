import React, { FC } from "react";
import { Button, Modal, Typography, Dropdown, Menu } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import BaseTooltip from "../../../shared/BaseTooltip";
import { StyledCard, TaskCardTitle, DeleteMenuItem } from "./TaskCard.styled";
import { ITaskCardProps } from "./TaskCard.types";

const TaskboardItemCard: FC<ITaskCardProps> = ({
  item,
  status,
  isDragging,
  onEdit,
  onDelete,
}) => {
  return (
    <StyledCard
      $isDragging={isDragging}
      size="small"
      title={
        <BaseTooltip overlay={item.title}>
          <span>
            <TaskCardTitle level={5} ellipsis={{ rows: 2 }}>
              {item.title}
            </TaskCardTitle>
          </span>
        </BaseTooltip>
      }
      extra={
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item icon={<EditOutlined />} onClick={() => onEdit(item)}>
                Editar
              </Menu.Item>
              <DeleteMenuItem
                icon={<DeleteOutlined />}
                onClick={() =>
                  Modal.confirm({
                    title: "Delete?",
                    content: `Are you sure to delete "${item.title}"?`,
                    onOk: () =>
                      onDelete({
                        status,
                        itemToDelete: item,
                      }),
                  })
                }
              >
                Borrar
              </DeleteMenuItem>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button size="small" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <BaseTooltip overlay={item.description}>
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
          {item.description}
        </Typography.Paragraph>
      </BaseTooltip>
    </StyledCard>
  );
};

export default TaskboardItemCard;
