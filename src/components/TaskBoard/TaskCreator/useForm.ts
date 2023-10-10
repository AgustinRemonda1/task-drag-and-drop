import { useEffect, useRef, useCallback } from "react";
import { Form, Input } from "antd";
import {
  ITaskCreatorProps,
  ITaskboardItemFormValues,
} from "./TaskCreator.types";

const useForm = ({
  visible,
  onClose,
  onSubmit,
}: Omit<ITaskCreatorProps, "initialValues">) => {
  const [form] = Form.useForm<ITaskboardItemFormValues>();

  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
      form.resetFields();
    }
  }, [form, visible]);

  const onSubmitForm = useCallback(
    (values: ITaskboardItemFormValues) => {
      onSubmit(values);
      form.resetFields();
      onClose();
    },
    [onSubmit, form, onClose]
  );

  return { state: { form, inputRef }, actions: { onSubmitForm } };
};

export default useForm;
