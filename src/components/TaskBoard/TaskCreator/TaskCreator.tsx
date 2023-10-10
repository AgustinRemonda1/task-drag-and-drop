import { FC } from "react";
import { Modal, Form, Input } from "antd";
import { ITaskCreatorProps } from "./TaskCreator.types";
import useForm from "./useForm";

const TaskCreator: FC<ITaskCreatorProps> = ({
  visible,
  initialValues,
  onClose,
  onSubmit,
}) => {
  const { state, actions } = useForm({ visible, onClose, onSubmit });

  return (
    <Modal
      title="Añadir tarea"
      visible={visible}
      destroyOnClose
      forceRender
      onCancel={onClose}
      onOk={() => state.form.submit()}
    >
      <Form
        autoComplete="off"
        form={state.form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={actions.onSubmitForm}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[
            { required: true, message: "El título es obligatorio." },
            {
              max: 100,
              message: "El título no puede ser mas de 100 caracteres.",
            },
          ]}
        >
          <Input ref={state.inputRef} autoFocus />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripcion"
          rules={[
            { required: true, message: "La descripcion es requerida." },
            {
              max: 400,
              message: "'La Descripcion no puede tener mas de 400 caracteres.",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskCreator;
