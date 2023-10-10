import { renderHook, act } from "@testing-library/react-hooks";
import useTaskCreator from "./useTaskCreator";
import { defaultItems } from "./TaskBoard.config";

describe("useTaskCreator", () => {
  const INITIAL_PROPS = {
    tasksByStatus: defaultItems,
    onChangeTask: jest.fn(),
  };

  it("show empty initial state when its initied with default values", async () => {
    const { result } = renderHook(() => useTaskCreator(INITIAL_PROPS));

    const expected = {
      isCreatorModalOpened: false,
      initialItem: { title: "", description: "" },
    };

    expect(result.current.state).toEqual(expected);
  });

  it("show creator modal open when add new task is clicked", async () => {
    const { result } = renderHook(() => useTaskCreator(INITIAL_PROPS));

    const expected = {
      isCreatorModalOpened: true,
      initialItem: { title: "", description: "" },
    };

    act(() => result.current.actions.onOpenCreator(null));

    expect(result.current.state).toEqual(expected);
  });

  it("show creator modal open when edit task is clicked", async () => {
    const { result } = renderHook(() => useTaskCreator(INITIAL_PROPS));

    const expected = {
      isCreatorModalOpened: true,
      initialItem: { title: "a editable task", description: "a editable task" },
    };

    act(() =>
      result.current.actions.onOpenCreator({
        id: "123123",
        title: "a editable task",
        description: "a editable task",
      })
    );

    expect(result.current.state).toEqual(expected);
  });

  it("close creator modal when edition mode has been cancelled", async () => {
    const { result } = renderHook(() => useTaskCreator(INITIAL_PROPS));

    const expected = {
      isCreatorModalOpened: false,
      initialItem: { title: "", description: "" },
    };

    act(() =>
      result.current.actions.onOpenCreator({
        id: "123123",
        title: "a editable task",
        description: "a editable task",
      })
    );

    act(() => result.current.actions.onCloseCreator());

    expect(result.current.state).toEqual(expected);
  });

  it("onChangeTask his called when new task has been created", async () => {
    const { result } = renderHook(() => useTaskCreator(INITIAL_PROPS));

    act(() => result.current.actions.onNewTask({ title: "", description: "" }));

    expect(INITIAL_PROPS.onChangeTask).toBeCalled();
  });
});
