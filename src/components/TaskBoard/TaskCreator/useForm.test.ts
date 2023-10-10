import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "./useForm";

describe("useForm", () => {
  const INITIAL_PROPS = {
    visible: false,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  it("onSubmit and onClose his called when submit form", async () => {
    const { result } = renderHook(() => useForm(INITIAL_PROPS));

    act(() =>
      result.current.actions.onSubmitForm({ title: "", description: "" })
    );

    expect(INITIAL_PROPS.onSubmit).toBeCalled();
    expect(INITIAL_PROPS.onClose).toBeCalled();
  });
});
