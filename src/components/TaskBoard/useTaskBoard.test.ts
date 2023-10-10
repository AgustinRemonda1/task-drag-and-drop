import { renderHook, act } from "@testing-library/react-hooks";
import useTaskBoard from "./useTaskBoard";
import { TaskboardItemStatus, defaultItems } from "./TaskBoard.config";
import { DragDrop } from "./TaskBoard.types";

describe("useTaskboard", () => {
  const exampleTasks = {
    ...defaultItems,
    [TaskboardItemStatus.TO_DO]: [
      {
        id: "12123",
        title: "hacer test",
        description: "probar que se puedan cargar nuevas tareas",
      },
      {
        id: "1213",
        title: "test un segundo test",
        description: "por si las dudas",
      },
    ],
  };

  it("show empty tasks when its initied with default values", async () => {
    const { result } = renderHook(() => useTaskBoard());

    const expected = defaultItems;

    expect(result.current.state.tasksByStatus).toEqual(expected);
  });

  it("show new tasks when has been created", async () => {
    const { result } = renderHook(() => useTaskBoard());

    act(() => result.current.actions.onChangeTask(exampleTasks));

    expect(result.current.state.tasksByStatus).toEqual(exampleTasks);
  });

  it("show tasks updated when has been edited", async () => {
    const { result } = renderHook(() => useTaskBoard());

    act(() => result.current.actions.onChangeTask(exampleTasks));

    const expected = {
      ...defaultItems,
      [TaskboardItemStatus.TO_DO]: [
        {
          id: "12123",
          title: "hacer test",
          description: "probar que se puedan cargar nuevas tareas",
        },
        {
          id: "1213",
          title: "test",
          description: "por si las dudas",
        },
      ],
    };

    act(() => result.current.actions.onChangeTask(expected));

    expect(result.current.state.tasksByStatus).toEqual(expected);
  });

  it("task changed status when user drag in another status", async () => {
    const { result } = renderHook(() => useTaskBoard());

    const drag: DragDrop = {
      source: { index: 0, droppableId: TaskboardItemStatus.TO_DO },
      destination: { index: 0, droppableId: TaskboardItemStatus.IN_PROGRESS },
    };

    act(() => result.current.actions.onChangeTask(exampleTasks));
    act(() => result.current.actions.onDragEnd(drag));

    const expected = {
      ...defaultItems,
      [TaskboardItemStatus.IN_PROGRESS]: [
        {
          id: "12123",
          title: "hacer test",
          description: "probar que se puedan cargar nuevas tareas",
        },
      ],
      [TaskboardItemStatus.TO_DO]: [
        {
          id: "1213",
          title: "test un segundo test",
          description: "por si las dudas",
        },
      ],
    };

    expect(result.current.state.tasksByStatus).toEqual(expected);
  });

  it("task changed position when user drag in same status", async () => {
    const { result } = renderHook(() => useTaskBoard());

    const drag: DragDrop = {
      source: { index: 0, droppableId: TaskboardItemStatus.TO_DO },
      destination: { index: 1, droppableId: TaskboardItemStatus.TO_DO },
    };

    act(() => result.current.actions.onChangeTask(exampleTasks));
    act(() => result.current.actions.onDragEnd(drag));

    const expected = {
      ...defaultItems,
      [TaskboardItemStatus.TO_DO]: [
        {
          id: "1213",
          title: "test un segundo test",
          description: "por si las dudas",
        },
        {
          id: "12123",
          title: "hacer test",
          description: "probar que se puedan cargar nuevas tareas",
        },
      ],
    };

    expect(result.current.state.tasksByStatus).toEqual(expected);
  });

  it("task deleted", async () => {
    const { result } = renderHook(() => useTaskBoard());

    act(() => result.current.actions.onChangeTask(exampleTasks));
    act(() =>
      result.current.actions.onDelete({
        itemToDelete: {
          id: "1213",
          title: "test un segundo test",
          description: "por si las dudas",
        },
        status: TaskboardItemStatus.TO_DO,
      })
    );

    const expected = {
      ...defaultItems,
      [TaskboardItemStatus.TO_DO]: [
        {
          id: "12123",
          title: "hacer test",
          description: "probar que se puedan cargar nuevas tareas",
        },
      ],
    };

    expect(result.current.state.tasksByStatus).toEqual(expected);
  });
});
